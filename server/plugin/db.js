module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect(
    `mongodb://127.0.0.1/starry`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err, data) => {
      if (err) throw err;
      console.log(`数据库连接成功，端口号 ${data.port}`);
    }
  );
};
