const express = require("express");
const bodyParser = require("body-parser"); //用于req.body获取值的
const dotenv = require("dotenv");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5555;

//-------------------------中间件--------------------------------
dotenv.config("./env");
console.log(process.env.REGION);
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
