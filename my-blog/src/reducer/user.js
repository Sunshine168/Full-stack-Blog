/*
action type of LOGIN
 */
const LOGIN_IN = 'LOGIN_IN';
const LOGIN_OUT = 'LOGIN_OUT';


//reducer for LOGIN
 const login = (state,action)=>{
  if(!state){
     state ={user:null}
  }
  switch(action.type){
    case LOGIN_IN:
    return{user:action.user}
    case LOGIN_OUT:
    return {user:null}
    default:
    return state;
  }
}

// //reducer for REGISTER
// export const register = (state,action)=>{
//   if(!state){
//       state={}
//   }
//   switch(action.type){
//     case REGISTER_ING:
//     return {register:register}
//     default:
//     return state;
//   }
// }


//-------action  creators----------
//------- for LOGIN
export const loginIn = (user)=>{
  return {type:LOGIN_IN,user}
}
export const loginOut = ()=>{
  return {type:LOGIN_OUT}
}

export default login;
