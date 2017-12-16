const checkLogin = require('../middlewares/check').checkLogin;
const PostModel = require('../models/posts');
const UserModel = require('../models/users');
const CommentModel = require('../models/comments');
module.exports = {
	// GET /posts 所有用户或者特定用户的文章页
	//   eg: GET /api/posts?author=xxx
	'GET /api/posts': async(ctx, next) => {
		// await checkLogin(ctx, next);
		//  let flashMessage = ctx.flash.get();
		    let author = ctx.request.query.author,
				    code   =1;
      try{
			   var posts = await	PostModel.getPosts(author),
				    user =  await UserModel.getUserById(author);
			}catch(e){
				   var message = e;
					     code = -1;
			}
			if(!user){
				code=-1
			}
			ctx.response.body = {
				code,
				message,
	      posts,
				user
			}
},
	// POST /posts 发表一篇文章
	'POST /api/posts':async(ctx, next) => {
		// await checkLogin(ctx, next);
		 let {article,user_id} = ctx.request.body;
		 let author =  user_id ||ctx.session.user._id,
		//  flashMessage = ctx.flash.get(),
		 code = 1,
		 message ="成功发表";
		 let postModel = {
			 author:author,
			 title:article.title,
			 content:article.context,
			 pv:0
		 }
		 try{
			 var result  = 	await PostModel.create(postModel),
							post = result.ops[0];
		}catch(e){
				 code=-1;
				message = "发表失败";
		}
		ctx.response.body={
		 "code":code,
		 "message":message,
		 "post":post
	 }
 },
	// GET /api/posts/:postId 单独一篇的文章页
	'GET /api/posts/:postId': async(ctx, next) => {
		// ctx.response.body = ctx.flash.get();
		let code = 1,{postId} = ctx.params,
		user = ctx.session.user;
		try{
			var result  =  await Promise.all([
				PostModel.getPostById(postId),   // 获取文章信息
				CommentModel.getComments(postId),// 获取该文章所有留言
				PostModel.incPv(postId)  // pv 加 1
			])
		   var post = result[0];
			 var comments = result[1];
			 if(!post){
				 throw new Error('不能找到该文章')
			 }
		}catch(e){
			  code = -1;
				console.log(e);
		}
		if(user){
			//比对
			if(user._id == post.author._id){
				ctx.response.body = {
					"code":code,
					post:post,
					current:user._id,
					comments:comments
				}
			}
		}else{
			ctx.response.body = {
				"code":code,
				post:post,
				comments:comments
			}
		}

	},
	// GET /api/posts/edit/:postId 单独一篇的文章页
  'GET /api/posts/edit/:postId': async(ctx, next) => {
	// ctx.response.body = ctx.flash.get();
	let code = 1;
	let {postId} = ctx.params;
	try{
		var post = await PostModel.getRawPostById(postId);   // 获取原生文章信息
		 if(!post){
			 throw new Error('不能找到该文章')
		 }
	}catch(e){
			code = -1;
	}
	ctx.response.body = {
		"code":code,
		post:post,
	}
},
	// POST /posts/:postId/edit 更新一篇文章
	'POST /api/posts/:postId/edit': async(ctx, next) => {
       let postId  =  ctx.params.postId,
			     author  =  ctx.request.body.user_id||ctx.session.user._id,
					 {title,context}  = ctx.request.body,
					 code = 1,
					 message="修改成功";
					 try{
						 await PostModel.updatePostById(postId, author, { title: title, content: context })
					 }catch(e){
						 message = e.message;
						 code =-1;
						 console.log(e);
					 }
					 ctx.response.body = {
						 code:code,
						 message:message,
					 }

	},
	// GET /posts/:postId/remove 删除一篇文章
	'GET /api/posts/:postId/remove': async(ctx, next) => {
		let {postId} = ctx.params,
		     author  = ctx.query.user_id||ctx.session.user._id,
				 code = 1,
				 message = "删除成功";
 try{
      await PostModel.delPostById(postId, author);
	}catch(e){
		message = e.message;
		code =1;
		}
		ctx.response.body = {
			code:code,
			message:message,
		}
	},
	// POST /posts/:postId/comment 创建一条留言
	'POST /api/posts/:postId/comment': async(ctx, next) => {
		  let postId  =  ctx.params.postId,
			    code = 1,
					message = "创建成功",
					author = ctx.request.body.user_id||ctx.session.user._id,
					content= ctx.request.body.comment
					let comment = {
						author:author,
						postId:postId,
						content:content
					}
			try{
				var result =  await CommentModel.create(comment);
			}catch(e){
          code = -1,
					message = e;
			}
   ctx.response.body = {
		 code:code,
		 message:message,
		 comment:comment,
	 }
	},
	// GET /posts/:postId/comment/:commentId/remove 删除一条留言
	'GET /posts/:postId/comment/:commentId/remove': async(ctx, next) => {
		let postId  =  ctx.params.postId,
		   commentId = ctx.params.commentId,
			 code = 1,
			 message = "删除成功",
			 author = ctx.query.user_id||ctx.session.user._id;
       try{
				await CommentModel.delCommentById(commentId, author)
			 }catch(e){
          code=-1;
					message=e;
			 }
			 ctx.response.body = {
				code:code,
				message:message,
			}
	}

}
