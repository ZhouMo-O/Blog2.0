const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); //用于req.body获取值的
const dotenv = require("dotenv");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5555;

//-------------------------中间件--------------------------------
dotenv.config("./env");
app.use(
  session({
    key: "key",
    secret: "keyboard cat",
    resave: false,
    httpOnly: false,
    saveUninitialized: true,
    signed: true,
    overwrite: true,
  })
);

app.use(
  require("cors")({
    origin: [
      `http://localhost:3000`,
      `http://192.168.2.100:8080`,
      `http://127.0.0.1:3000`,
      `http://127.0.0.1:5555`,
      `http://www.blog5.net.cn`,
      `http://blog5.net.cn`,
      `http://47.101.217.184:3000`,
    ],
    credentials: true,
  })
);
app.use("/", express.static(__dirname + "/dist")); //静态文件托管
require("./router/router")(app); //router
require("./plugin/db")(app); //db
app.listen(PORT, "0.0.0.0", () => {
  console.log(`服务启动 端口号:${PORT}`);
});
