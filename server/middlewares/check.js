var checkLogin = async(ctx, next) => {
	if (!ctx.session.user) {
		ctx.flash.set('error', '未登录');
		ctx.redirect('/signIn');
	}
	await next();
}
var checkNotLogin = async(ctx, next) => {
	if (ctx.session.user) {
		ctx.flash.set('已登录');
		ctx.redirect('back');
	}
	await next();
}
module.exports = {
	checkLogin: checkLogin,
	checkNotLogin: checkNotLogin
}