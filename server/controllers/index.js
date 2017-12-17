const index = async(ctx) => {
	ctx.session.flag = "1";
	await ctx.render('build/index', {
	});
}

const testOnlineStatus = async(ctx)=>{
	ctx.response.body = 1 ;
}

module.exports = {
	'GET /': index,
	'GET /api/test':testOnlineStatus
}
