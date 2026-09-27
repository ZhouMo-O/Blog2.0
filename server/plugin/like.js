module.exports = (app) => {
  const crypto = require("crypto");
  let likeDb = require("../model/Like");
  let articleDb = require("../model/Article");

  // ============================================================
  // 匿名点赞身份（A+D 方案）
  // ------------------------------------------------------------
  // 原实现只用 IP 作为身份，问题是：
  //   1) 同一出口 IP（办公室/校园网/基站）下所有人共用一个身份，别人点过你就点不了；
  //   2) X-Real-IP 由客户端自定义，脚本可随意伪造刷赞。
  // 现在把身份收敛为 hash(IP + User-Agent + 前端匿名 visitorId)：
  //   - 对普通读者依旧是零门槛，无需登录；
  //   - visitorId 由前端首次访问时生成并持久化，脚本不携带就与真实读者区分开；
  //   - 再叠加同 IP 频率限制，超出阈值时才要求图形验证码（复用已有 svg-captcha）。
  // 注：不迁移历史点赞记录，老访客最多会获得一次额外的点赞机会，影响可忽略。
  // ============================================================

  //点赞频率限制：同一 IP 在窗口期内允许的点赞/取消次数
  const RATE_WINDOW_MS = 60 * 1000;
  const RATE_MAX = 10;
  const rateMap = new Map(); // ip -> { count, start }

  function hitRateLimit(ip) {
    const now = Date.now();
    const rec = rateMap.get(ip);
    if (!rec || now - rec.start > RATE_WINDOW_MS) {
      rateMap.set(ip, { count: 1, start: now });
      return false;
    }
    rec.count += 1;
    if (rec.count > RATE_MAX) return true;
    return false;
  }

  //定期清理过期的限流记录，避免内存无限增长
  setInterval(() => {
    const now = Date.now();
    for (const [ip, rec] of rateMap) {
      if (now - rec.start > RATE_WINDOW_MS * 2) rateMap.delete(ip);
    }
  }, RATE_WINDOW_MS).unref();

  function clientIp(req) {
    return req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
  }

  function visitorKey(req) {
    const ip = clientIp(req);
    const ua = req.get("User-Agent") || "";
    const visitorId = String(req.body.visitorId || req.query.visitorId || "");
    return crypto
      .createHash("sha256")
      .update(ip + "|" + ua + "|" + visitorId)
      .digest("hex");
  }

  //点赞接口
  app.post("/api/like", async (req, res) => {
    const ip = clientIp(req);
    const userIp = visitorKey(req);
    const articleId = req.body.articleId;

    if (!articleId) {
      return res.status(400).send({ msg: "缺少文章ID" });
    }

    //频率超限：要求先通过图形验证码，正常读者几乎不会触发
    if (hitRateLimit(ip)) {
      const code = String(req.body.code || "");
      const sessionCaptcha = req.session && req.session.captcha;
      if (!sessionCaptcha) {
        return res.status(429).send({ msg: "操作过于频繁，请刷新页面后重试" });
      }
      if (
        !code ||
        code.toLocaleLowerCase() !== sessionCaptcha.toLocaleLowerCase()
      ) {
        return res.status(429).send({ msg: "操作过于频繁，请输入验证码" });
      }
      //验证码通过后放行，并重置该 IP 的计数
      rateMap.delete(ip);
    }

    const userLike = await likeDb.findOne({
      userIp: userIp,
      articleId: articleId,
    });
    console.log(`访客点赞标识: ${userIp.slice(0, 12)}...`);
    if (userLike) {
      console.log(`访客取消点赞`);
      try {
        await likeDb.findOneAndRemove({
          articleId: articleId,
          userIp: userIp,
        });
        await articleDb.findByIdAndUpdate(
          { _id: articleId },
          { $inc: { like: -1 } }
        );
        console.log(articleId, "取消点赞");
        res.status(200).send({ msg: "取消点赞" });
      } catch (error) {
        console.log("删除数据失败！", error);
        res.status(500).send({ msg: "操作失败" });
      }
    } else {
      try {
        await likeDb.create({ articleId, userIp });
        await articleDb.findByIdAndUpdate(
          { _id: articleId },
          { $inc: { like: 1 } }
        );
        console.log(articleId, " 点赞成功");
        res.status(200).send({ msg: "点赞成功" });
      } catch (error) {
        console.log("创建数据失败", error);
        res.status(500).send({ msg: "操作失败" });
      }
    }
  });

  //判断用户是否点过赞 主要用于在页面加载的时候的时候，来改变界面的css
  app.get("/api/like/beenLiked/:id", async (req, res) => {
    const userIp = visitorKey(req);
    const articleId = await likeDb.findOne({
      userIp: userIp,
      articleId: req.params.id,
    });
    if (articleId) {
      res.status(200).send({ code: "200", msg: "已经点赞" });
    } else {
      res.status(200).send({ code: "400", msg: "还未点赞" });
    }
  });

  //点赞数量：原路由漏了前导斜杠，"api/like/likeSum/:id" 永远匹配不到；
  //且 findOne().count() 在新版 Mongoose 上语义错误，改用 countDocuments。
  app.get("/api/like/likeSum/:id", async (req, res) => {
    const articleSum = await likeDb.countDocuments({
      articleId: req.params.id,
    });
    res.send({ msg: "点赞数量", articleSum: articleSum });
  });
};
