const checkNotLogin = require('../middlewares/check').checkNotLogin;
module.exports = {
	'GET /home/login': async(ctx, next) => {
		// await checkNotLogin(ctx, next);
		// ctx.response.body = ctx.flash.get();
		await ctx.render("home/login",{

		})
	},
	'POST /SignIn': async(ctx, next) => {
		await checkNotLogin(ctx, next);
		ctx.response.body = ctx.flash.get();
	}
}
