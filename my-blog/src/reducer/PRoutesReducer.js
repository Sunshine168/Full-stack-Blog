/*
action type of PROUTE
 */
const CHANGE_PROUTE = "CHANGE_PROUTE";

//reducer for PROUTE
export const comment = (state,action)=>{
  if(!state){
     state={}
  }
  switch(action.type){
    case CHANGE_PROUTE:
    return {
      component:action.component
      path:action.path
    }
    default:
    return state;
  }
}
