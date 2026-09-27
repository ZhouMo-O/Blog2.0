module.exports = (app, auth) => {
  const userDbProceesor = require("../db/user");

  app.post("/api/user/login", async (req, res) => {
    const { userName, passWord, code } = req.body;
    const user = new userDbProceesor(
      userName,
      passWord,
      code,
      req.session.captcha,
      process.env.token
    ); //返回一个对象{code：code，message:"errorMessage"/data:data}

    let userRes = await user.login();
    //失败分支必须 return：否则会在 400 之后继续执行到 200，
    //触发 ERR_HTTP_HEADERS_SENT 并返回 token: undefined
    if (userRes.code == 0) {
      return res.status(400).send({ message: userRes.message });
    }

    return res.status(200).send(userRes.token);
  });

  app.post("/api/user/register", auth, async (req, res) => {
    const { userName, passWord } = req.body;
    const user = new userDbProceesor(userName, passWord);
    //原实现漏了 await，userRes 是 Promise，.code 永远为 undefined，
    //导致「重名/密码过短」校验完全失效
    let userRes = await user.register();

    if (userRes.code == 0) {
      return res.status(400).send({ message: userRes.message });
    }

    return res.status(200).send(userRes.data);
  });
};
