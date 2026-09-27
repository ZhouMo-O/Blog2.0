module.exports = app => {
  const svgCaptcha = require("svg-captcha");

  app.get("/api/svgCaptcha", (req, res) => {
    let captcha = svgCaptcha.create({
      //适当增加干扰，降低脚本识别率
      size: 4,
      noise: 3,
      ignoreChars: "0o1ilI",
    });
    req.session.captcha = captcha.text.toLocaleLowerCase();
    //原实现 console.log(req.session) 会把验证码明文连同 cookie 一起写进日志，
    //任何能读日志的人都能在有效期内直接绕过验证码，这里不再打印。
    res.type("svg");
    res.set("Cache-Control", "no-store");
    res.status(200).send(captcha.data);
  });
};
