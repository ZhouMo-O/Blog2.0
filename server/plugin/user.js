module.exports = (app) => {
  const userDbProceesor = require("../db/user");

  // ============================================================
  // 登录防爆破
  // ------------------------------------------------------------
  // 原先完全没有频率限制，验证码又存在 session 里可反复复用：
  // 拿一次验证码后，同一个会话就能无限次试密码。
  // 这里做两件事：
  //   1) 同 IP 限流（窗口内尝试次数上限）；
  //   2) 同用户名失败计数锁定（防止换 IP 继续撞同一个账号）；
  //   3) 验证码一次性：校验通过/失败后立即销毁，必须重新获取。
  // ============================================================
  const WINDOW_MS = 10 * 60 * 1000; // 统计窗口 10 分钟
  const IP_MAX = 10; // 同 IP 窗口内最多尝试次数
  const USER_FAIL_MAX = 5; // 同用户名连续失败上限
  const USER_LOCK_MS = 15 * 60 * 1000; // 触发后锁定时长

  const ipMap = new Map(); // ip -> { count, start }
  const userFailMap = new Map(); // userName -> { fails, lockedUntil }

  function clientIp(req) {
    return req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
  }

  function hitIpLimit(ip) {
    const now = Date.now();
    const rec = ipMap.get(ip);
    if (!rec || now - rec.start > WINDOW_MS) {
      ipMap.set(ip, { count: 1, start: now });
      return false;
    }
    rec.count += 1;
    return rec.count > IP_MAX;
  }

  function isUserLocked(userName) {
    if (!userName) return false;
    const rec = userFailMap.get(userName);
    if (!rec) return false;
    if (rec.lockedUntil && Date.now() < rec.lockedUntil) return true;
    if (rec.lockedUntil && Date.now() >= rec.lockedUntil) {
      userFailMap.delete(userName);
    }
    return false;
  }

  function markUserFail(userName) {
    if (!userName) return;
    const rec = userFailMap.get(userName) || { fails: 0, lockedUntil: 0 };
    rec.fails += 1;
    if (rec.fails >= USER_FAIL_MAX) {
      rec.lockedUntil = Date.now() + USER_LOCK_MS;
      rec.fails = 0;
    }
    userFailMap.set(userName, rec);
  }

  function clearUserFail(userName) {
    if (userName) userFailMap.delete(userName);
  }

  //定期清理过期记录，避免内存无限增长
  setInterval(() => {
    const now = Date.now();
    for (const [ip, rec] of ipMap) {
      if (now - rec.start > WINDOW_MS * 2) ipMap.delete(ip);
    }
    for (const [name, rec] of userFailMap) {
      if (!rec.lockedUntil || now > rec.lockedUntil + WINDOW_MS) {
        userFailMap.delete(name);
      }
    }
  }, WINDOW_MS).unref();

  app.post("/api/user/login", async (req, res) => {
    const { userName, passWord, code } = req.body || {};
    const ip = clientIp(req);

    if (hitIpLimit(ip)) {
      return res
        .status(429)
        .send({ message: "登录尝试过于频繁，请稍后再试" });
    }

    if (isUserLocked(userName)) {
      return res
        .status(429)
        .send({ message: "该账号多次登录失败，请15分钟后再试" });
    }

    //验证码一次性：无论成功失败都销毁，防止同一会话反复复用
    const sessionCaptcha = req.session && req.session.captcha;
    if (req.session) {
      req.session.captcha = null;
    }

    const user = new userDbProceesor(
      userName,
      passWord,
      code,
      sessionCaptcha,
      process.env.token
    ); //返回一个对象{code：code，message:"errorMessage"/data:data}

    let userRes = await user.login();
    //失败分支必须 return：否则会在 400 之后继续执行到 200，
    //触发 ERR_HTTP_HEADERS_SENT 并返回 token: undefined
    if (userRes.code == 0) {
      //只有「密码错误」才计入账号失败次数；
      //验证码错误/用户不存在不计入，避免误伤与账号枚举
      if (userRes.message === "密码错误!") {
        markUserFail(userName);
      }
      return res.status(400).send({ message: userRes.message });
    }

    clearUserFail(userName);
    return res.status(200).send(userRes.token);
  });

  app.post("/api/user/register", require("../midware/auth")(), async (req, res) => {
    const { userName, passWord } = req.body || {};
    const user = new userDbProceesor(userName, passWord);
    //原实现漏了 await，userRes 是 Promise，.code 永远为 undefined，
    //导致「重名/密码过短」校验完全失效
    let userRes = await user.register();

    if (userRes.code == 0) {
      return res.status(400).send({ message: userRes.message });
    }

    return res.status(200).send(userRes.data);
  });
};
