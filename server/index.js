const express = require("express");
const app = express();
const PORT = 5555;

//-------------------------中间件--------------------------------
require("./plugin/db")(app);
require("./router/router")(app);

app.listen(PORT, () => {
  console.log(`服务启动 端口号:${PORT}`);
});
