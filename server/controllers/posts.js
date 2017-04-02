const checkLogin = require('../middlewares/check').checkLogin;



module.exports = {
	// GET /posts 所有用户或者特定用户的文章页
	//   eg: GET /posts?author=xxx
	'GET /posts': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// POST /posts 发表一篇文章
	'POST /posts': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// GET /posts/create 发表文章页
	'GET /posts/create': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// GET /posts/:postId 单独一篇的文章页
	'GET posts/:postId': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// GET /posts/:postId/edit 更新文章页
	'GET posts/:postId/edit': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// POST /posts/:postId/edit 更新一篇文章
	'POST /posts/:postId/edit': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// GET /posts/:postId/remove 删除一篇文章
	'GET /posts/:postId/remove': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// POST /posts/:postId/comment 创建一条留言
	'POST /posts/:postId/comment': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	},
	// GET /posts/:postId/comment/:commentId/remove 删除一条留言
	'GET /posts/:postId/comment/:commentId/remove': async(ctx, next) => {
		ctx.response.body = ctx.flash.get();
	}

}