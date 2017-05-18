/*
action type of COMMENTS
 */
const INIT_COMMNETS = 'INIT_COMMNETS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

//reducer for COMMENTS
 const comment = (state,action)=>{
  if(!state){
     state = {
       comments:[],
       isFetching:false,
     }
  }
  switch(action.type){
    case REQUEST_COMMENTS:
    return {
         ...state,
         isFetching:true
    }
    case RECEIVE_COMMENTS:
    return {
      ...state,
      isFetching:false,
      comments:action.comments
    }
    case INIT_COMMNETS:
    return {
      ...state,
      comments:action.comments
    }
    case ADD_COMMENT:
    return {
      ...state,
      comments:[...state.comments,action.comment]
    }
    case DELETE_COMMENT:
    return {
      ...state,
      comments:[
        ...state.comments.slice(0,action.commentIndex),
        ...state.comments.slice(action.commentIndex+1)
      ]
    }
    default:
    return state;
  }
}

// for COMMENTS
export const initComments = (comments)=>{
  return {type:INIT_COMMNETS,comments}
}
export const addComment = (comment)=>{
  return {type:ADD_COMMENT,comment}
}
export const deleteComment = (comment)=>{
  return {type:DELETE_COMMENT,comment}
}
export const requestComments = ()=>{
  return {tyep:REQUEST_COMMENTS}
}
export const receiveComemnts = (comments)=>{
  return {tyep:REQUEST_COMMENTS,comments}
}
export default comment;
