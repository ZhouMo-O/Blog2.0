module.exports = (app) => {
  const articleDb = require("../model/Article");
  const commentDb = require("../model/Comment");
  const sendEmail = require("./sendEmail");

  app.post("/api/comment", async (req, res) => {
    if (req.body.istopComment) {
      const model = await commentDb.create(req.body);
      await articleDb.findByIdAndUpdate(
        { _id: req.body.blogId },
        { $inc: { comment: 1 } }
      );
      sendEmail(process.env.eamailUser, `收到一条评论：${req.body.content}`);
      console.log(`评论数据`, req.body);
      res.send(model);
    } else if (req.body.isauthorsComment) {
      console.log("博主回复");
      const model = await commentDb.create(req.body);
      await articleDb.findByIdAndUpdate(
        { _id: req.body.blogId },
        { $inc: { comment: 1 } }
      );
      const replyEmail = await commentDb.findById(req.body.replyId);
      console.log(`查找id`, replyEmail);
      if (replyEmail.email) {
        sendEmail(replyEmail.email, `收到一条回复：${req.body.content}`);
      }
      // sendEmail(
      //   process.env.eamailUser,
      //   `一条评论收到回复：${req.body.content}`
      // );
      console.log(`评论数据(回复)：`, req.body);
      res.send(model);
    } else {
      const model = await commentDb.create(req.body);
      await articleDb.findByIdAndUpdate(
        { _id: req.body.blogId },
        { $inc: { comment: 1 } }
      );
      const replyEmail = await commentDb.findById(req.body.replyId);
      console.log(`查找id`, replyEmail);
      if (replyEmail.email) {
        // sendEmail(replyEmail.email, `收到一条回复：${req.body.content}`);
      }
      // sendEmail(
      //   process.env.eamailUser,
      //   `一条评论收到回复：${req.body.content}`
      // );
      console.log(`评论数据(回复)：`, req.body);
      res.send(model);
    }
  });
};
