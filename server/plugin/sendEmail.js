//对邮件正文做 HTML 转义，防止评论内容里的标签被直接渲染（邮件 HTML 注入）
function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
    html: `<b>${escapeHtml(message)}</b>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info);
  });
};
