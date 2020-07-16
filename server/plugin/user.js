module.exports = (app) => {
  const userDbProceesor = require("../db/user");

  app.post("/api/user/login", async (req, res) => {
    const { userName, passWord, svgCode } = req.body;
    const user = new userDbProceesor(userName, passWord, svgCode); //返回一个对象{code：code，message:"errorMessage"/data:data}
    let userRes = user.login();

    if (userRes.code == 0) {
      res.status(400).send(userRes.message);
    }
    res.status(200).send(userRes.token);
  });
};
