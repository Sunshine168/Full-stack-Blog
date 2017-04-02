var index = async(ctx, next) => {
	console.log('index');
	let title = "hello";

	await ctx.render('index', {
		title: title
	});
}
module.exports = {
	'GET /index': index
}