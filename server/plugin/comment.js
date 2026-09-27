module.exports = (app) => {
  const articleDb = require("../model/Article");
  const commentDb = require("../model/Comment");
  const sendEmail = require("./sendEmail");

  // 评论限流：同一 IP 在窗口期内最多提交的评论数，防止脚本刷爆邮箱
  const RATE_WINDOW_MS = 60 * 1000;
  const RATE_MAX = 5;
  const rateMap = new Map(); // ip -> { count, start }

  function clientIp(req) {
    return req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
  }

  function hitRateLimit(ip) {
    const now = Date.now();
    const rec = rateMap.get(ip);
    if (!rec || now - rec.start > RATE_WINDOW_MS) {
      rateMap.set(ip, { count: 1, start: now });
      return false;
    }
    rec.count += 1;
    return rec.count > RATE_MAX;
  }

  setInterval(() => {
    const now = Date.now();
    for (const [ip, rec] of rateMap) {
      if (now - rec.start > RATE_WINDOW_MS * 2) rateMap.delete(ip);
    }
  }, RATE_WINDOW_MS).unref();

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //基础字段校验：原先完全不校验，任何人可提交超长内容/非法邮箱
  function validate(body) {
    const content = String(body.content || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();

    if (!content) return "评论内容不能为空";
    if (content.length > 1000) return "评论内容不能超过1000字";
    if (!name) return "昵称不能为空";
    if (name.length > 20) return "昵称不能超过20字";
    if (email && !EMAIL_RE.test(email)) return "邮箱格式不正确";
    if (email.length > 100) return "邮箱过长";
    if (!body.blogId) return "缺少文章ID";
    return null;
  }

  app.post("/api/comment", async (req, res) => {
    const err = validate(req.body);
    if (err) {
      return res.status(400).send({ message: err });
    }

    if (hitRateLimit(clientIp(req))) {
      return res.status(429).send({ message: "评论过于频繁，请稍后再试" });
    }

    try {
      if (req.body.istopComment) {
        const model = await commentDb.create(req.body);
        await articleDb.findByIdAndUpdate(
          { _id: req.body.blogId },
          { $inc: { comment: 1 } }
        );
        sendEmail(process.env.eamailUser, `收到一条评论：${req.body.content}`);
        console.log(`评论数据`, req.body);
        return res.send(model);
      } else if (req.body.isauthorsComment) {
        console.log("博主回复");
        const model = await commentDb.create(req.body);
        await articleDb.findByIdAndUpdate(
          { _id: req.body.blogId },
          { $inc: { comment: 1 } }
        );
        //replyId 指向的评论可能不存在，必须判空，否则读 .email 会抛 TypeError → 500
        const replyEmail = req.body.replyId
          ? await commentDb.findById(req.body.replyId)
          : null;
        if (replyEmail && replyEmail.email) {
          sendEmail(replyEmail.email, `收到一条回复：${req.body.content}`);
        }
        console.log(`评论数据(回复)：`, req.body);
        return res.send(model);
      } else {
        const model = await commentDb.create(req.body);
        await articleDb.findByIdAndUpdate(
          { _id: req.body.blogId },
          { $inc: { comment: 1 } }
        );
        const replyEmail = req.body.replyId
          ? await commentDb.findById(req.body.replyId)
          : null;
        if (replyEmail && replyEmail.email) {
          sendEmail(replyEmail.email, `收到一条回复：${req.body.content}`);
        }
        sendEmail(
          process.env.eamailUser,
          `一条评论收到回复：${req.body.content}`
        );
        console.log(`评论数据(回复)：`, req.body);
        return res.send(model);
      }
    } catch (e) {
      console.log("评论提交失败", e);
      return res.status(500).send({ message: "评论提交失败，请稍后再试" });
    }
  });
};
