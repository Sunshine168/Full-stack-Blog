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
    case ADD_ARTICLE:
    return {
      posting:false,
      articles:[...state.articles,action.result]
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


// export const deleteMessage= (message)=>({
//     msgType:message.type,
//     msg:message.context
//   })


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
