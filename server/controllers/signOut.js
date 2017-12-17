var checkLogin = require("../middlewares/check").checkLogin;
module.exports = {
  "GET /signOut": async (ctx, next) => {
    await checkLogin(ctx, next);
    ctx.response.body = ctx.flash.get();
  }
};
