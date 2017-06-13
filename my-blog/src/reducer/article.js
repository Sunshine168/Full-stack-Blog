import {fetchPosts} from '../service/fetch';
import {startProgress,finishProgress} from '../reducer/progress';
/*
目前所有关于redux的内容都暂时集中在一个文件处理
目前功能比较简单，如果功能复杂考虑按照类别分类，但action和reducer会放在同一个文件中
后续使用异步数据流,请求数据的时候通过进度条反馈
*/

//-------action-------//
/*
action  type of ARTICLES
 */
 const INIT_ARTICLES = 'INIT_ARTICLES'
 const ADD_ARTICLE = 'ADD_ARTICLE'
 const DELETE_ARTICLE = 'DELETE_ARTICLE'

 const POST_STARTED = 'POST_STARTED'
 const POST_SUCCESS = 'POST_SUCCESS'
 const POST_FAILURE = 'POST_FAILURE'





/*
action stauts
 */

  const LOADING = 'loading'
  const SUCCESS = 'success'
  const FAILURE = 'failuer'


//reducer for ARTICLES
 const article = (state,action)=>{
  if(!state){
     state = {
       articles:[],
       posting:false,
     }
  }
  switch(action.type){
    case INIT_ARTICLES:
    return {
      ...state,
      articles:action.articles.articles,
      author:action.articles.author
    }
    case POST_SUCCESS:
    return {
      posting:false,
      articles:[...state.articles,action.result]
    }
    case POST_STARTED:
    return {
      ...state,
      posting:true,
    }
    case POST_FAILURE:
    return {
      ...state,
      posting:"error",
    }
    case DELETE_ARTICLE:
    return {
      ...state,
      articles:[
        ...state.articles.slice(0,action.articleIndex),
        ...state.articles.slice(action.articleIndex+1)
      ]
    }
    default:
    return state;
  }
}





// -------action  creators----------




// for article
export const initArticles = (articles)=>{
  return {type:INIT_ARTICLES,articles}
}
export const addArticle = (article)=>{
  return {type:ADD_ARTICLE,article}
}
export const deleteArticle = (articleIndex)=>{
  return {type:DELETE_ARTICLE,articleIndex}
}
export default article;


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


// export const fetchArticles = (userId)=>{
//   return async(dispatch)=>{
//     dispatch(fetchArticlesStarted())
//     let result = await fetchPosts(userId);
//     if(result.code==1){
//       dispatch(fetchArticlesSuccess(result.posts))
//     }else{
//       dispatch(fetchArticlesFailure(result.msg))
//     }
//   }
// }
