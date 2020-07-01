module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose.connect(
    `mongodb://127.0.0.1:27017/starry`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err, data) => {
      if (err) throw err;
      console.log(`数据库连接成功，端口号 ${data.port}`);
    }
  );
};
