module.exports = (app) => {
  const db = require("../model/like");
  app.post("/api/like", async (req, res) => {
    const userIp = req.ip;
    const articleId = req.body.articleId;
    const userLike = await db.findOne({ articleId: articleId });
    if (userLike && userLike.userIp == userIp) {
      try {
        await db.findOneAndRemove(articleId);
        console.log("取消点赞");
        res.status(200).send({ msg: "取消点赞" });
      } catch (error) {
        console.log("删除数据失败！", error);
      }
    } else {
      try {
        await db.create({ articleId: articleId, userIp: userIp });
        console.log("点赞成功");
        res.status(200).send({ msg: "点赞成功" });
      } catch (error) {
        console.log("创建数据失败", error);
      }
    }
  });
};
