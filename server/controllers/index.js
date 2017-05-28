var index = async(ctx, next) => {
	ctx.session.flag = "1";
	await ctx.render('build/index', {
	});
}
module.exports = {
	'GET /': index,
}
