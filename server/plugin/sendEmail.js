module.exports = (targetEmail, message) => {
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: "465",
    secure: true,
    auth: {
      user: process.env.eamailUser,
      pass: process.env.emailPassWord,
    },
  });

  let mailOptions = {
    from: `<${process.env.eamailUser}>`,
    to: `${targetEmail}`,
    subject: "来自博客Starry的消息通知",
    html: `<b>${message}</b>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info);
  });
};
