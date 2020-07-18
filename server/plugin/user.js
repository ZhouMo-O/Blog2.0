module.exports = (app) => {
  const userDbProceesor = require("../db/user");

  app.post("/api/user/login", async (req, res) => {
    const { userName, passWord, code } = req.body;
    const user = new userDbProceesor(
      userName,
      passWord,
      code,
      req.session.captcha
    ); //返回一个对象{code：code，message:"errorMessage"/data:data}

    let userRes = await user.login();
    console.log(userRes);
    if (userRes.code == 0) {
      res.status(400).send(userRes.message);
    }
    res.status(200).send(userRes.token);
  });

  app.post("/api/user/register", async (req, res) => {
    const { userName, passWord } = req.body;
    const user = new userDbProceesor(userName, passWord);
    let userRes = user.register();

    if (userRes.code == 0) {
      res.status(400).send(userRes.message);
    }

    res.status(200).send(userRes.data);
  });
};
