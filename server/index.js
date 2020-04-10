const express = require("express");
const bodyParser = require("body-parser"); //用于req.body获取值的
const app = express();
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 5555;

//-------------------------中间件--------------------------------
app.use(
  require("cors")({
    origin: [`http://localhost:8080`, `http://192.168.2.100:8080`],
    credentials: true,
  })
);

require("./router/router")(app); //router
require("./plugin/db")(app); //db
app.listen(PORT, () => {
  console.log(`服务启动 端口号:${PORT}`);
});
