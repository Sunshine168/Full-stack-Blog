

/*
action type of FLASHMESSAGE
 */
const SHOW_FLASHMESSAGE = "SHOW_FLASHMESSAGE"
const REMOVE_FLASHMESSAGE ="REMOVE_FLASHMESSAGE"


//reducer for flashMessage
 const flashMessage  = (state,action)=>{
  if(!state){
    state = {
      show:false,
      msg:"网络错误"
    }
  }
  switch(action.type){
    case SHOW_FLASHMESSAGE:
    return {
      type:action.flashMessage.msgType,
      msg:action.flashMessage.msg,
      show:true
    }
    case REMOVE_FLASHMESSAGE:
    return {
      ...state,
      show:!state.show
    }
    default:
    return state;
  }
}


// for flashMessage
export const showFlashMessage = (flashMessage)=>{
  return {type:SHOW_FLASHMESSAGE,flashMessage}
}
export const removeFlashMessage = (
    {type:REMOVE_FLASHMESSAGE}
)

export default flashMessage;
