var checkLogin = async(ctx, next) => {
	if (!ctx.session.user) {
		//多页面中使用flash进行页面重定向后的信息反馈
		/*
		ctx.flash.set('error', '未登录');
		 ctx.redirect('/signIn');
		*/
	//单页应用中通过 ajax 检查登录状态
		ctx.response.body = {
			"code":0,
			"message":"未登录",
		}
	}
	await next();
}
var checkNotLogin = async(ctx, next) => {
	if (ctx.session.user) {
			//多页面中使用flash进行页面重定向后的信息反馈
		 /*
		 ctx.flash.set('已登录');
		 ctx.redirect('back');
		 */

		//单页应用中通过 ajax 检查登录状态 
		ctx.response.body = {
			"code":0,
			"message":"已登录",
		}
	}
	await next();
}
module.exports = {
	checkLogin: checkLogin,
	checkNotLogin: checkNotLogin
}
