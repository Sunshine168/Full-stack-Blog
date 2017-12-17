const checkNotLogin = require("../middlewares/check").checkNotLogin;
const crypto = require("crypto");

let UserModel = require("../models/users");

module.exports = {
  "GET /home/login": async ctx => {
    // await checkNotLogin(ctx, next);
    // ctx.response.body = ctx.flash.get();
    await ctx.render("home/login", {});
  },
  //登录api
  "POST /api/signIn": async (ctx, next) => {
    await checkNotLogin(ctx, next);
    let code = "1",
      message = "登录成功",
      { account, password } = ctx.request.body,
      user = await UserModel.getUserByAccount(account);
    password = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    if (user && password == user.password) {
      delete user.password;
      ctx.session.user = user;
      ctx.response.body = {
        code: code,
        message: message,
        user: user
      };
    } else {
      code = "-1";
      message = "用户或密码错误";
      ctx.response.body = {
        code: code,
        message: message
      };
    }
  }
};
