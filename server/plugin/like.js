const user = require("./user");

module.exports = (app) => {
  let commentDb = require("../model/Like");
  let articleDb = require("../model/Article");
  let sendmail = require("../plugin/sendEmail");
  //点赞接口
  app.post("/api/like", async (req, res) => {
    const userIp = req.headers["X-Real-IP"] || req.ip;
    const articleId = req.body.articleId;
    const userLike = await commentDb.findOne({
      userIp: userIp,
      articleId: articleId,
    });
    console.log(`用户点赞Ip: ${userIp}`);
    if (userLike) {
      try {
        await commentDb.findOneAndRemove({
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
      }
    } else {
      try {
        await commentDb.create({ articleId, userIp });
        await articleDb.findByIdAndUpdate(
          { _id: articleId },
          { $inc: { like: 1 } }
        );
        // sendmail("wujiancheng@infosafe.net.cn", "收到一条新的点赞消息！");
        console.log(articleId, " 点赞成功");
        res.status(200).send({ msg: "点赞成功" });
      } catch (error) {
        console.log("创建数据失败", error);
      }
    }
  });

  //判断用户是否点过赞 主要用于在页面加载的时候的时候，来改变界面的css
  app.get("/api/like/beenLiked/:id", async (req, res) => {
    const articleId = await commentDb.findOne({ articleId: req.params.id });
    const userIp = req.ip;
    if (articleId && articleId.userIp == userIp) {
      res.status(200).send({ code: "200", msg: "已经点赞" });
    } else {
      res.status(200).send({ code: "400", msg: "还未点赞" });
    }
  });

  //点赞数量
  app.get("api/like/likeSum/:id", async (req, res) => {
    const articleSum = await commentDb
      .findOne({ articleId: req.params.id })
      .count();
    res.send({ msg: "点赞数量", articleSum: articleSum });
  });
};
