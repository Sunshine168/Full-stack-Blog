/*
目前所有关于redux的内容都暂时集中在一个文件处理
目前功能比较简单，如果功能复杂考虑按照类别分类，但action和reducer会放在同一个文件中
后续使用异步数据流,请求数据的时候通过进度条反馈
*/

//-------action-------//


/*
action type of REGISTER
 */
const REGISTER_ING = 'REGISTER_ING';
const REGISTER_DONE = 'REGISTER_DONE';




/*
action type of POSTS
 */
const INIT_POSTS = 'INIT_POSTS'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'

/*
action  type of ARTICLES
 */
 const INIT_ARTICLES = 'INIT_ARTICLES'
 const ADD_ARTICLE = 'ADD_ARTICLE'
 const DELETE_ARTICLE = 'DELETE_ARTICLE'







//reducer for ARTICLES
 const article = (state,action)=>{
  if(!state){
     state = {articles:[]}
  }
  switch(action.type){
    case INIT_ARTICLES:
    return {articles:action.articles}
    case ADD_ARTICLE:
    return {
      articles:[...state.articles,action.article]
    }
    case DELETE_ARTICLE:
    return {
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
