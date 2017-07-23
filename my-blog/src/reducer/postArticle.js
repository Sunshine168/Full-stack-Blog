
 const POST_STARTED = 'POST_STARTED'
 const POST_SUCCESS = 'POST_SUCCESS'
 const POST_FAILURE = 'POST_FAILURE'
 const INIT_EDIT_ARTICLE = 'INIT_EDIT_ARTICLE'
 const SET_REDIRECT =  'SET_REDIRECT'
/*发表/修改文章*/
//reducer for ARTICLES
 const postArticle = (state,action)=>{
  if(!state){
     return  {
       article:null,
       posting:false,
       postResult:false,
     }
  }
  switch(action.type){
    case POST_SUCCESS:
    return {
      ...state,
      posting:false,
      article:action.article,
      postResult:true
    }
    case POST_STARTED:
    return {
      ...state,
      posting:true,
      postResult:false
    }
    case POST_FAILURE:
    return {
      ...state,
      posting:"error",
      postResult:false
    }
    case INIT_EDIT_ARTICLE:
    return {
      ...state,
      posting:false,
      article:action.article,
      postResult:true
    }
    default:
    return state;
  }
}

// -------action  creators----------
export default postArticle;
//
export const postArticleStarted = () =>({
  type:POST_STARTED
})

export const postArticleSuccess = (result)=>({
  type:POST_SUCCESS,
  result
})
export const postArticleFailure = (error)=>({
  type:POST_FAILURE,
  error
})
export const successPost = (msg)=>(
  {
    msgType:"success",
    msg:msg
  }
)
export const failurePost = (error)=>(
  {
    msgType:"warning",
    msg:error
  }
)
export const initEditArticle = (article)=>({
  type:INIT_EDIT_ARTICLE,
  article
})
export const setRedirect = (path)=>(
{
  type:SET_REDIRECT,
  path
})


export const fetchArticleFail = (error)=>(
  {
    msg:error,
    msgType:"warning",
  }
)
