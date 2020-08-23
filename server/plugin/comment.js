module.exports = (app) => {
  const articleDb = require("../model/Article");
  const commentDb = require("../model/Comment");

  app.post("/api/comment", async (req, res) => {
    const model = await commentDb.create(req.body);
    await articleDb.findByIdAndUpdate(
      { _id: req.body.blogId },
      { $inc: { comment: 1 } }
    );
    console.log(`评论数据`, req.body);
    res.send(model);
  });
};
