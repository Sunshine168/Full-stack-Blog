var index = async(ctx, next) => {
	await ctx.render('index', {
	});
}
module.exports = {
	'GET /index': index
}
