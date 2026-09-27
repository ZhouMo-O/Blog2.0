module.exports = (app) => {
  return async (req, res, next) => {
    const jwt = require("jsonwebtoken");
    const adminUser = require("../model/User");

    //截取token
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();

    //无token处理：必须 return，否则会继续执行到 jwt.verify 抛异常
    if (!token) {
      return res.status(401).send({ message: "请先登录" });
    }

    //错误token处理：jwt.verify 校验失败会抛异常，
    //不捕获的话会变成 500 并可能泄漏堆栈，这里统一转成 401
    let payload;
    try {
      payload = jwt.verify(token, process.env.token);
    } catch (e) {
      return res.status(401).send({ message: "无效token!" });
    }

    req.user = await adminUser.findById(payload);
    //查不到用户也必须 return，否则「无效 token」依然会被放行
    if (!req.user) {
      return res.status(401).send({ message: "无效token!" });
    }

    return next();
  };
};
