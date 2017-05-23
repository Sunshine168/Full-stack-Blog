var index = async(ctx, next) => {
	console.log("hello this is index");
	await ctx.render('build/index', {
	});
}
var defaultIndex = async(ctx,next)=>{
	await ctx.render('index');

}
var resume = async(ctx,next)=>{
	await ctx.render('resume');

}
module.exports = {
	'GET /': index,
	'GET /me':defaultIndex,
	'GET /resume':resume,
}
