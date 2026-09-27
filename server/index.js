const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); //用于req.body获取值的
const dotenv = require("dotenv");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//端口改为可配置，默认保持原 5555，避免硬编码
const PORT = process.env.PORT || 5555;

//-------------------------中间件--------------------------------
dotenv.config("./env");

//不要向客户端暴露服务端框架信息
app.disable("x-powered-by");

app.use(
  session({
    key: "key",
    //会话密钥从环境变量读取，未配置时给出随机值；
    //原实现硬编码 "keyboard cat"，等于把签名密钥公开
    secret: process.env.SESSION_SECRET || require("crypto").randomBytes(32).toString("hex"),
    resave: false,
    //验证码等会话数据不应被前端 JS 读取，改为 HttpOnly
    httpOnly: true,
    saveUninitialized: true,
    signed: true,
    overwrite: true,
  })
);

app.use(
  require("cors")({
    origin: [
      `http://localhost:3000`,
      `http://localhost:8080`,
      `http://localhost:5555`,
      `https://www.blog5.net.cn`,
      `https://blog5.net.cn`,
      `https://admins.blog5.net.cn`,
    ],
    credentials: true,
  })
);
app.use("/", express.static(__dirname + "/dist")); //静态文件托管
require("./router/router")(app); //router
require("./plugin/db")(app); //db

//-------------------------兜底处理--------------------------------
// 原先没有任何兜底：
//   - 未匹配的 /api 路径会落到静态资源，返回 HTML 404；
//   - 中间件抛出的未捕获异常由 Express 默认处理器返回带堆栈的 HTML。
// 前端 http.js 依赖 err.response.data.message，拿到 HTML 时会读到 undefined。
// 这里统一返回 JSON。
app.use("/api", (req, res) => {
  res.status(404).send({ message: "接口不存在" });
});

app.use((err, req, res, next) => {
  console.log("未处理的服务端错误:", err && err.message);
  if (res.headersSent) return next(err);
  res.status(err && err.status ? err.status : 500).send({
    message: "服务器内部错误",
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`服务启动 端口号:${PORT}`);
});
