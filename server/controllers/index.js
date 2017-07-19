var index = async(ctx, next) => {
	ctx.session.flag = "1";
	await ctx.render('build/index', {
	});
}
var testOnlineStatus = async(ctx,next)=>{
	ctx.response.body = 1 ;
}
module.exports = {
	'GET /': index,
	'GET /api/test':testOnlineStatus
}
