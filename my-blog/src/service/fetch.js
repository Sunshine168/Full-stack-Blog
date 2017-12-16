import { get, post, formPost } from "../util/post";
/*
处理所有网络请求_目前没有和action集成异步数据流，
使用同步数据流达成类似效果的后遗症应该就是组件耦合性巨高。。
 */

/*
请求所有的博文
 /api/posts?author=xxx
 */
export const fetchPosts = id => {
  return get(`/api/posts?author=${id}`);
};
/*
请求单个博文
/api/posts/
 */
export const fetchPost = postId => {
  return get(`/api/posts/${postId}`);
};

/*
删除博文
 */
export const deletePost = params => {
  return get(`/api/posts/${params.postId}/remove`);
};

/*
发表博文
 */
export const addPost = params => {
  return post("/api/posts", {
    article: params.article
  });
};

// GET api/posts/edit/:postId  获取编辑文章的信息
export const fetchEditPost = postId => {
  return get(`/api/posts/edit/${postId}`);
};

/*
更新博文
*/
export const updatePost = params => {
  return post(`/api/posts/${params.articleId}/edit`, {
    title: params.title,
    context: params.context
  });
};

/*
注册
 */
export const register = formData => {
  return formPost("/api/signUp", formData);
};
/*
登录
 */
export const login = params => {
  return post("/api/signIn", params);
};

/*
添加评论
 */
export const addComment = params => {
return post(`/api/posts/${params.articleId}/comment`,params);
};

/*
删除评论
 */
// GET /posts/:postId/comment/:commentId/remove 删除一条留言
export const deleteComment = async params => {
  const { articleId, commentId } = params
  return get(`/posts/${articleId}/comment/${commentId}/remove`)
};

export const checkAccount = async account => {
  return post("/api/checkAccount",account)
};


export const loginFetch = params => {
  return post("/api/signIn", params)
};
