var index = async(ctx, next) => {
	console.log("hello this is index");
	await ctx.render('build/index', {
	});
}
var defaultIndex = async(ctx,next)=>{
	await ctx.render('index');

}
var about = async(ctx,next)=>{
	await ctx.render('resume/about');

}
var project = async(ctx,next)=>{
	await ctx.render('resume/project');

}
module.exports = {
	'GET /': index,
	'GET /me':defaultIndex,
	'GET /me/about':about,
	'GET /me/project':project,
}
