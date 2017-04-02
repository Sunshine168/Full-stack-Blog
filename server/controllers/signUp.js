const checkNotLogin = require('../middlewares/check').checkNotLogin;
module.exports = {
	'GET /signUp': async(ctx, next) => {
		await checkNotLogin(ctx, next);
		ctx.response.body = ctx.flash.get();
	},
	'POST /signIn': async(ctx, next) => {
		await checkNotLogin(ctx, next);
		ctx.response.body = ctx.flash.get();
	}
}