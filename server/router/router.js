module.exports = (app) => {
  const express = require("express");
  console.log(new Date().toLocaleString());
  const router = express.Router({
    mergeParams: true,
  });

  const resourceMiddleware = require("../midware/resource");
  const authMiddleware = require("../midware/auth");

  //允许前端透传的查询字段白名单。
  //原先直接把 req.query 交给 Mongoose，攻击者可用 ?privacy[$ne]=true 这类
  //自定义操作符绕过过滤，这里只放行已知字段并做类型收敛。
  const QUERY_WHITELIST = ["privacy", "relatedTag", "blogId", "tagName", "userName"];

  function buildQuery(rawQuery) {
    const safe = {};
    if (!rawQuery || typeof rawQuery !== "object") return safe;
    Object.keys(rawQuery).forEach((key) => {
      //含 . 或 $ 的键一律忽略（MongoDB 操作符与嵌套注入面）
      if (key.includes("$") || key.includes(".")) return;
      if (!QUERY_WHITELIST.includes(key)) return;
      const value = rawQuery[key];
      //只接受字符串/数字/布尔，拒绝对象与数组（?privacy[$ne]=true 会被拦在这里）
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        safe[key] = value;
      }
    });
    return safe;
  }

  //写操作必须登录：原实现只有 DELETE 挂了鉴权，
  //POST/PUT 裸奔会导致任何人可新增/篡改线上数据
  router.post("/", authMiddleware(), async (req, res) => {
    const model = await req.Model.create(req.body);
    console.log(`创建数据`, req.body);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    //注意：mongoose 的 modelName 是首字母大写的（"Article"），
    //原实现用 === "article" 判断恒为 false，导致 populate 从未生效，
    //这里统一按小写比较。
    const isArticle = String(req.Model.modelName).toLowerCase() === "article";

    const query = buildQuery(req.query);
    if (Object.keys(query).length) {
      console.log(`查询条件`, query);
    }

    let cursor = req.Model.find(query).sort({ createTime: "desc" });

    if (isArticle) {
      //列表接口不需要正文，剔除后单次传输从 ~80KB 降到 ~20KB
      cursor = cursor.select("-markdown -html");
      cursor = cursor.populate("relatedTag");
    }

    const item = await cursor;
    console.log(`获取 ${req.params.resource}列表`);
    res.send(item);
  });

  router.get("/:id", async (req, res) => {
    try {
      const item = await req.Model.findById(req.params.id); //.populate("relatedTag");
      console.log(`查找 ${req.params.id}`);
      res.send(item);
    } catch (error) {
      console.log("error");
      res.status(404).send({ message: "not find" });
    }
  });

  router.put("/:id", authMiddleware(), async (req, res) => {
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
  //图片上传（新增 / 删除，均需登录）
  require("../plugin/FileProcess")(app, authMiddleware());
  //阅读量/点赞数/评论数原子自增（读者侧，无需登录）
  require("../plugin/counter")(app);
  //点赞接口
  require("../plugin/like")(app);
  //svg验证码
  require("../plugin/svgCaptcha")(app);
  //user
  require("../plugin/user")(app, authMiddleware());
  //comment
  require("../plugin/comment")(app);
};
