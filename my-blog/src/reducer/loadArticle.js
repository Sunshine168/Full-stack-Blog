export const INIT_LOAD_ARTICLE = 'INIT_LOAD_ARTICLE'
export const SET_CURRENT = 'SET_CURRENT'

const loadArticle = (state,action)=>{
  if(!state){
    return {
      article:{
        title:"",
        context:""
      },
      current:null,
      redirect:null,
    }
  }
  switch(action.type){
     case INIT_LOAD_ARTICLE:
     return {
       ...state,
       article:action.article,
     }
     case SET_CURRENT:
     return {
       ...state,
       current:action.current
     }
     default:
     return state
  }
}


export const initLoadArticle = (article)=>({
  type:INIT_LOAD_ARTICLE,
  article
})
export const setCurrent = (current)=>({
  type:SET_CURRENT,
  current
})
export default loadArticle;
