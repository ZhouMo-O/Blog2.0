module.exports = app = (app) => {
  const svgCaptcha = require("svg-captcha");

  app.get("/api/svgCaptcha", (req, res) => {
    let captcha = svgCaptcha.create();
    req.session.captcha = captcha.text.toLocaleLowerCase();
    console.log(req.session);
    res.type("svg");
    res.status(200).send(captcha.data);
  });
};
