// 用户的find，delete 使用通用restfullApi操作。
// 此类只做user的 register 和 login 操作。
// user的password的hash混淆是在userSchem表里操作，具体请查看user的schema表。
const userModel = require("../plugin/user");

class User {
  constructor(userName, passWord, svgCode) {
    //本该把userModel作为参数传进来的，但是没有类型提示，TS还是要上的。
    this.userModel = userModel;
    this.userName = userName;
    this.passWord = passWord;
    this.svgCode = svgCode;
  }

  //用户注册
  async register() {
    let user = await this.userModel.findOne(this.userName);
    if (user) {
      return { code: 0, message: "已存在相同的用户名!" };
    }

    if (user.passWord < 6) {
      return { code: 0, message: "密码不可以小于6位" };
    }
    let createUser = await this.userModel.create(this.userName, this.passWord);
    return { code: 1, data: createUser };
  }

  //用户登陆
  async login() {
    let user = await this.userModel.findOne(this.userName).select("+passWord");
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
        id: user._id,
      },
      "procee.env.token"
    );

    return { code: 1, token: token };
  }
}

module.exports = User;
