const START_PROGRESS = 'START_PROGRESS'
const FINISH_PROGRESS = 'FINISH_PROGRESS'

//reducer for PROGRESS
const progress = (state,action)=>{
  if(!state){
    state={
      isStart:false,
      isFinish:false,
      now:1,
    }
}
switch (action.type) {
     case START_PROGRESS:
     return {
       ...state,
       isStart:true,
     }
     case FINISH_PROGRESS:
     return {
       isStart:false,
       isFinish:true,
       now:98,
     }
     default:
       return state;
   }
  }


// -------action  creators----------
// for PRROGRESS
export const startProgress = ()=>{
  return {type:START_PROGRESS}
}
export const finishProgress = ()=>{
  return {type:FINISH_PROGRESS}
}


export default progress;
