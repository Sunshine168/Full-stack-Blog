//-------action-------//
/*
action  type of ARTICLES
 */
 const INIT_ARTICLES = 'INIT_ARTICLES'
 const ADD_ARTICLE = 'ADD_ARTICLE'
 const DELETE_ARTICLE = 'DELETE_ARTICLE'

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
