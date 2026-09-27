module.exports = (app) => {
  const articleDb = require("../model/Article");

  // ============================================================
  // 阅读量 / 点赞数 / 评论数的原子自增接口
  // ------------------------------------------------------------
  // 背景：第一阶段给所有写操作（POST/PUT/DELETE）加了登录鉴权后，
  // 首页/文章页原来那句「匿名 PUT 整个文章对象」被 401 拦下了 ——
  // 阅读量不再增长，而且回传整个对象本身也危险（可被顺手改标题/正文）。
  // 这里把「计数」单独拆成只允许白名单字段自增的接口：
  //   - 不需要登录（读者浏览自然产生）；
  //   - 只接受 delta: +1 / -1，不接受任意字段赋值；
  //   - 用 $inc 原子操作，避免并发覆盖。
  // ============================================================
  const COUNTER_FIELDS = ["read", "like", "comment"];

  app.post("/api/counter/:resource/:id", async (req, res) => {
    const { resource, id } = req.params;
    const field = String(req.body.field || "");
    const delta = Number(req.body.delta);

    if (String(resource).toLowerCase() !== "article") {
      return res.status(400).send({ msg: "不支持的资源" });
    }
    //只允许白名单字段，且步长限定为 +1/-1，杜绝任意改写
    if (!COUNTER_FIELDS.includes(field)) {
      return res.status(400).send({ msg: "不支持的计数字段" });
    }
    if (delta !== 1 && delta !== -1) {
      return res.status(400).send({ msg: "步长不合法" });
    }

    try {
      const updated = await articleDb.findByIdAndUpdate(
        id,
        { $inc: { [field]: delta } },
        { new: true, select: "read like comment" }
      );
      if (!updated) return res.status(404).send({ msg: "文章不存在" });
      res.send({
        msg: "ok",
        read: updated.read,
        like: updated.like,
        comment: updated.comment,
      });
    } catch (error) {
      console.log("计数更新失败", error);
      res.status(500).send({ msg: "计数更新失败" });
    }
  });
};
