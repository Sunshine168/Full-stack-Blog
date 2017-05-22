var index = async(ctx, next) => {
	console.log("hello this is index");
	await ctx.render('build/index', {
	});
}
var defaultIndex = async(ctx,next)=>{
	await ctx.render('index');

}
module.exports = {
	'GET /': index,
	'GET /me':defaultIndex,
}
