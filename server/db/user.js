// 用户的find，delete 使用通用restfullApi操作。
// 此类只做user的 register 和 login 操作。
// user的password的hash混淆是在userSchem表里操作，具体请查看user的schema表。
const userModel = require("../model/User");

class User {
  constructor(userName, passWord, svgCode, sessionCaptcha, token) {
    //本该把userModel作为参数传进来的，但是没有类型提示，TS还是要上的。
    this.userModel = userModel;
    this.userName = userName;
    this.passWord = passWord;
    this.svgCode = svgCode;
    this.sessionCaptcha = sessionCaptcha;
    this.token = token;
    //仅记录登录尝试的用户名，绝不打印明文密码
    if (userName) {
      console.log(`登录尝试 userName: ${this.userName}`);
    }

    this.initUser();
  }

  //初始化一个默认管理员。
  //原实现把账号密码硬编码在源码里（starryAdmin / 123456789），
  //开源后等于把后台口令公开，这里改为：
  //  1) 仅在数据库中还没有任何用户时才创建；
  //  2) 密码从环境变量 ADMIN_INIT_PASSWORD 读取，未配置则不自动建号。
  async initUser() {
    const existUser = await this.userModel.findOne({});
    if (existUser) {
      return true;
    }

    const initPassword = process.env.ADMIN_INIT_PASSWORD;
    if (!initPassword) {
      console.log(
        "未配置 ADMIN_INIT_PASSWORD，跳过默认管理员创建。如需初始化请设置该环境变量后重启。"
      );
      return false;
    }

    let createUser = await this.userModel.create({
      userName: process.env.ADMIN_INIT_USERNAME || "starryAdmin",
      passWord: initPassword,
    });
    return { code: 1, data: createUser };
  }

  //用户注册
  async register() {
    let user = await this.userModel.findOne({ userName: this.userName });
    if (user) {
      return { code: 0, message: "已存在相同的用户名!" };
    }

    //原实现是 this.passWord < 6，字符串与数字比较结果恒不正确，
    //必须用长度判断
    if (!this.passWord || this.passWord.length < 6) {
      return { code: 0, message: "密码不可以小于6位" };
    }
    let createUser = await this.userModel.create({
      userName: this.userName,
      passWord: this.passWord,
    });
    return { code: 1, data: createUser };
  }

  //用户登陆
  async login() {
    if (!this.svgCode) {
      return { code: 0, message: "验证码不能为空" };
    }

    if (!this.sessionCaptcha) {
      return { code: 0, message: "验证码已失效，请刷新页面" };
    }

    if (
      this.svgCode.toLocaleLowerCase() !=
      this.sessionCaptcha.toLocaleLowerCase()
    ) {
      return { code: 0, message: "验证码错误" };
    }

    let user = await this.userModel
      .findOne({ userName: this.userName })
      .select("+passWord");
    if (!user) {
      return { code: 0, message: "用户不存在!" };
    }

    const isValid = require("bcrypt").compareSync(this.passWord, user.passWord);
    if (!isValid) {
      return { code: 0, message: "密码错误!" };
    }

    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        _id: user._id,
      },
      this.token
    );

    return { code: 1, token: token };
  }
}

module.exports = User;
