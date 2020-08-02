module.exports = (app) => {
  const express = require("express");
  console.log(new Date().toLocaleString());
  const router = express.Router({
    mergeParams: true,
  });
  const hljs = require("highlight.js");
  const MarkdownIt = require("markdown-it")({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' +
        MarkdownIt.utils.escapeHtml(str) +
        "</code></pre>"
      );
    },
  });

  const resourceMiddleware = require("../midware/resource");
  const authMiddleware = require("../midware/auth");

  router.post("/", authMiddleware(), async (req, res) => {
    const model = await req.Model.create(req.body);
    console.log(`创建数据`, req.body);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "article") {
      queryOptions.populate = "relatedTag";
    }

    if (req.query !== "") {
      console.log(`查询条件`, req.query);
    }

    const item = await req.Model.find(req.query)
      // .setOptions(queryOptions)
      .sort({ createTime: "desc" });
    console.log(`获取 ${req.params.resource}列表`);
    res.send(item);
  });

  router.get("/:id", async (req, res) => {
    const item = await req.Model.findById(req.params.id); //.populate("relatedTag");
    if (item.markdown) {
      item.html = MarkdownIt.render(item.markdown);
      console.log(item.html);
    }
    console.log(`查找 ${req.params.id}`);
    res.send(item);
  });

  router.put("/:id", async (req, res) => {
    const item = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    console.log(`更新 ${req.params.id}`);
    res.send(item);
  });

  router.delete("/:id", authMiddleware(), async (req, res) => {
    console.log(req.params.id);
    const data = await req.Model.findByIdAndDelete(req.params.id);
    console.log(`删除 ${req.params.resource} 中的 ${data}`);
    res.send(data);
  });

  app.use("/api/rest/:resource", resourceMiddleware(), router);
  //图片上传
  require("../plugin/FileProcess")(app, authMiddleware());
  //点赞接口
  require("../plugin/like")(app);
  //svg验证码
  require("../plugin/svgCaptcha")(app);
  //user
  require("../plugin/user")(app, authMiddleware());
};
