module.exports = (app) => {
  const express = require("express");
  console.log(new Date().toLocaleString());

  const router = express.Router({
    mergeParams: true,
  });

  const resourceMiddleware = require("../midware/resource");

  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    console.log(`创建数据`, req.body);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    const queryOptions = {};
    // if (req.Model.modelName === "article") {
    //   queryOptions.populate = "relatedTag";
    // }
    // console.log(`查询条件`, req.query);
    const item = await req.Model.find(req.query); //.setOptions(queryOptions);
    console.log(`获取 ${req.params.resource}列表`);
    res.send(item);
  });

  router.get("/:id", async (req, res) => {
    const item = await req.Model.findById(req.params.id); //.populate("relatedTag");
    console.log(`查找 ${req.params.id}`);
    console.log(item);
    res.send(item);
  });

  router.put("/:id", async (req, res) => {
    const item = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    console.log(`查找 ${req.params.id}`);
    console.log(item);
    res.send(item);
  });

  router.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    const data = await req.Model.findByIdAndDelete(req.params.id);
    console.log(`删除 ${req.params.resource} 中的 ${data}`);
    res.send(data);
  });

  app.use("/api/rest/:resource", resourceMiddleware(), router);
  //图片上传
  require("../plugin/FileProcess")(app);
};
