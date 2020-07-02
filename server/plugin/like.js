module.exports = (app) => {
  let db = require("../model/like");
  //点赞接口
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
        console.log(data);
        res.status(200).send({ msg: "点赞成功" });
      } catch (error) {
        console.log("创建数据失败", error);
      }
    }
  });

  //判断用户是否点过赞 主要用于在页面加载的时候的时候，来改变界面的css
  app.get("/api/like/beenLiked/:id", async (req, res) => {
    const articleId = await db.findOne({ articleId: req.params.id });
    const userIp = req.ip;
    if (articleId && articleId.userIp == userIp) {
      res.status(200).send({ code: "200", msg: "已经点赞" });
    } else {
      res.status(200).send({ code: "400", msg: "还未点赞" });
    }
  });

  //点赞数量
  app.get("api/like/likeSum/:id", async (req, res) => {
    const articleSum = await db.findOne({ articleId: req.params.id }).count();
    res.send({ msg: "点赞数量", articleSum: articleSum });
  });
};
