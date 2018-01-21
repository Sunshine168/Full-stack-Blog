const PostModel = require("../models/posts");
const UserModel = require("../models/users");
const CommentModel = require("../models/comments");

module.exports = {
  // GET /posts 所有用户或者特定用户的文章页
  //   eg: GET /api/posts?author=xxx
  "GET /api/posts": async ctx => {
    let author = ctx.request.query.author,
      resCode = 200,
      message;
    try {
      var posts = await PostModel.getPosts(author),
        user = await UserModel.getUserById(author);
    } catch (e) {
      resCode = 500;
      message = "用户不存在";
    }
    if (!user) {
      resCode = -1;
    }
    ctx.response.body = {
      resCode,
      message,
      posts,
      user
    };
  },
  // POST /posts 发表一篇文章
  "POST /api/posts": async ctx => {
    const { article, user_id } = ctx.request.body;
    const author_id = user_id || ctx.session.user._id;
    let resCode = 200,
      message = "成功发表";
    let postModel = {
      author: author_id,
      title: article.title,
      content: article.context,
      pv: 0
    };
    try {
      var result = await PostModel.create(postModel),
        post = result.ops[0];
    } catch (e) {
      resCode = 500;
      message = "发表失败";
    }
    ctx.response.body = {
      resCode,
      message,
      post
    };
  },
  // GET /api/posts/:postId 单独一篇的文章页
  "GET /api/posts/:postId": async ctx => {
    let resCode = 200,
      message = "",
      { postId } = ctx.params,
      user = ctx.session.user;
    try {
      var result = await Promise.all([
        PostModel.getPostById(postId), // 获取文章信息
        CommentModel.getComments(postId), // 获取该文章所有留言
        PostModel.incPv(postId) // pv 加 1
      ]);
      var post = result[0];
      var comments = result[1];
      if (!post) {
        throw new Error("不能找到该文章");
      }
    } catch (e) {
      resCode = 500;
      message = "文章不存在";
    }
    if (resCode === 500) {
      ctx.response.body = {
        resCode,
        message
      };
    } else {
      if (user && user._id === post.author) {
        ctx.response.body = {
          resCode,
          post,
          current: user._id,
          comments
        };
      } else {
        ctx.response.body = {
          resCode,
          post,
          comments,
          message
        };
      }
    }
  },
  // GET /api/posts/edit/:postId  编辑文章
  "GET /api/posts/edit/:postId": async ctx => {
    let resCode = 200,
      message = "";
    let { postId } = ctx.params;
    try {
      var post = await PostModel.getRawPostById(postId); // 获取原生文章信息
      if (!post) {
        throw new Error("不能找到该文章");
      }
    } catch (e) {
      resCode = 500;
      message = "文章不存在";
    }
    ctx.response.body = {
      resCode,
      post,
      message
    };
  },
  // POST /posts/:postId/edit 更新一篇文章
  "POST /api/posts/:postId/edit": async ctx => {
    let postId = ctx.params.postId,
      author = ctx.request.body.user_id || ctx.session.user._id,
      { title, context } = ctx.request.body,
      resCode = 200,
      message = "修改成功";
    try {
      await PostModel.updatePostById(postId, author, {
        title: title,
        content: context
      });
    } catch (e) {
      message = "更新失败";
      resCode = 500;
    }
    ctx.response.body = {
      resCode,
      message
    };
  },
  // GET /posts/:postId/remove 删除一篇文章
  "GET /api/posts/:postId/remove": async ctx => {
    let { postId } = ctx.params,
      author = ctx.session.user._id,
      resCode = 200,
      message = "删除成功";
    try {
      if(!postId || !author){
        throw new Error('文章不存在')
      }
      await PostModel.delPostById(postId, author);
    } catch (e) {
      message = "删除失败";
      resCode = 500;
    }
    ctx.response.body = {
      resCode,
      message
    };
  },
  // POST /posts/:postId/comment 创建一条留言
  "POST /api/posts/:postId/comment": async ctx => {
    let postId = ctx.params.postId,
      resCode = 200,
      message = "创建成功",
      author = ctx.request.body.user_id || ctx.session.user._id,
      content = ctx.request.body.comment;
    let comment = {
      author: author,
      postId: postId,
      content: content
    };
    try {
      await CommentModel.create(comment);
    } catch (e) {
      resCode = 500;
      message = "创建失败";
    }
    ctx.response.body = {
      resCode,
      message,
      comment
    };
  },
  // GET /posts/:postId/comment/:commentId/remove 删除一条留言
  "GET /posts/:postId/comment/:commentId/remove": async ctx => {
    let commentId = ctx.params.commentId,
      resCode = 200,
      message = "删除成功",
      author = ctx.query.user_id || ctx.session.user._id;
    try {
      await CommentModel.delCommentById(commentId, author);
    } catch (e) {
      resCode = 500;
      message = "删除失败";
    }
    ctx.response.body = {
      resCode,
      message
    };
  }
};
