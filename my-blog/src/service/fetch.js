export const DOMAIN = "";
const CREDENTIALS = (process.env.ORIGIN)?"include":'same-origin';
/*
处理所有网络请求_目前没有和action集成异步数据流，
使用同步数据流达成类似效果的后遗症应该就是组件耦合性巨高。。
 */

/*
请求所有的博文
 /api/posts?author=xxx
 */
export const fetchPosts = async(id)=>{
  let url = DOMAIN+`/api/posts?author=${id}`;
  try{
    var result = await fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
   credentials: CREDENTIALS,
    })
  }catch(e){
    console.log(e);
  }
  if(result){
    return result.json();
  }else{
    return {
       code:-2,
       message:"未知错误"
    }
  }
}
/*
请求单个博文
/api/posts/
 */
export const fetchPost = async(postId)=>{
  if(DOMAIN=='..'){
    //服务器部署下需要调整路径,没有考虑到相对路径存在的问题
  }
  let url = DOMAIN+`/api/posts/${postId}`;
  try{
    var result = await fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
   credentials: CREDENTIALS,
    })
  }catch(e){
    console.log(e);
  }
  if(result){
    return result.json();
  }else{
    return {
       code:-2,
       message:"未知错误"
    }
  }
}

/*
删除博文
 */
export const deletePost = async(params)=>{
   let url = DOMAIN+`/api/posts/${params.postId}/remove`;
   try{
     var result = await fetch(url,{
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
   },
   credentials: CREDENTIALS,
     })
   }catch(e){
     console.log(e);
   }
   if(result){
     return result.json();
   }else{
     return {
       code:-2,
       message:"未知错误"
     }
   }
}

/*
发表博文
 */
 export const addPost = async(params)=>{
    let url = DOMAIN+"/api/posts";
    try{
      var result = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
           article:params.article,
    }),
       credentials: CREDENTIALS,
      })
    }catch(e){
      console.log(e);
    }
    if(result){
      return result.json();
    }else{
      return {
       code:-2,
       message:"未知错误"
      }
    }
 }
 // GET api/posts/edit/:postId  获取编辑文章的信息
 export const fetchEditPost = async(postId)=>{
   let url = DOMAIN+`/api/posts/edit/${postId}`;
   try{
     var result = await fetch(url,{
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
   },
      credentials: CREDENTIALS,
     })
   }catch(e){
     console.log(e);
   }
   if(result){
     return result.json();
   }else{
     return {
        code:-2,
        message:"未知错误"
     }
   }
 }

/*
更新博文
*/
export const updatePost = async(params)=>{
  console.log(params)
   let url = DOMAIN+`/api/posts/${params.articleId}/edit`;
   try{
     var result = await fetch(url,{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     title:params.title,
     context:params.context,
   }),
      credentials: CREDENTIALS,
     })
   }catch(e){
     console.log(e);
   }
   if(result){
     return result.json();
   }else{
     return {
        code:-2,
        message:"未知错误"
     }
   }
}

/*
注册
涉及头像上传
暂时不分离
params
account
name
password
bio
 */
 export const register = async(formData)=>{
   let url = DOMAIN+'/api/signUp';
   try{
     var result = await fetch(url,{
       method: 'POST',
  //      headers: {
  //          'Content-Type': 'application/x-www-form-urlencoded'
  //  },
   body:formData
   })
   }catch(e){
     console.log(e);
   }
   if(result){
     return result.json();
   }else{
     return {
      code:-2,
      message:"未知错误"
     }
   }
 }
/*
登录
 */
export const login = async(params)=>{
  let url = DOMAIN+'/api/signIn',
      {account,password}=params;
  try{
    var result = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    account: account,
    password:password,
  }),
     credentials: CREDENTIALS,
    })
  }catch(e){
    console.log(e);
  }
  if(result){
    return result.json();
  }else{
    return {
     code:-2,
     message:"未知错误"
    }
  }
}

/*
添加评论
 */
export const addComment = async(params)=>{
  let{articleId,comment}=params,
  url = DOMAIN+`/api/posts/${articleId}/comment`;
  try{
    var result = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    articleId:articleId,
    content:comment,
  }),
     credentials: CREDENTIALS,
    })
  }catch(e){
    console.log(e);
  }
  if(result){
    return result.json();
  }else{
    return {
     code:-2,
     message:"未知错误"
    }
  }
}

/*
删除评论
 */
// GET /posts/:postId/comment/:commentId/remove 删除一条留言
export const deleteComment = async(params)=>{
  let{articleId,commentId}=params,
  url = DOMAIN+`/posts/${articleId}/comment/${commentId}/remove`;
  try{
    var result = await fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
     credentials: CREDENTIALS,
    })
  }catch(e){
    console.log(e);
  }
  if(result){
    return result.json();
  }else{
    return {
     code:-2,
     message:"未知错误"
    }
  }
}
export const checkAccount = async(account)=>{
  let url = DOMAIN+"/api/checkAccount";
  try{
    var result = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      account
  }),
     credentials: CREDENTIALS,
    })
  }catch(e){
    console.log(e);
  }
  if(result){
    return result.json();
  }else{
    return {
     code:-2,
     message:"未知错误"
    }
  }
}



//** promise

export const loginFetch= (params)=>{
  let url = DOMAIN+'/api/signIn',
      {account,password}=params;
  return fetch(url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
  account: account,
  password:password,
}),
   credentials: CREDENTIALS,
  })
}
