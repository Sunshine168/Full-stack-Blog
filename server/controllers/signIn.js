const checkNotLogin = require('../middlewares/check').checkNotLogin;
module.exports = {
	'GET /signIn': async(ctx, next) => {
		await checkNotLogin(ctx, next);
		ctx.response.body = ctx.flash.get();
	},
	'POST /SignIn': async(ctx, next) => {
		await checkNotLogin(ctx, next);
		ctx.response.body = ctx.flash.get();
	}
}