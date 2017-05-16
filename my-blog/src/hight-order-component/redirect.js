import React, {
	Component
} from 'react';
import {Redirect} from'react-router-dom';

/*
暂时归类为高阶组件。。
思考是赋予组件处理跳转逻辑的方法
这里先留下两种方案
第一种是耦合的赋予附件跳转的能力
第二种方案是在高阶组件直接获取props中的登录状态进行跳转
 */
const redirect = (WrappedComponent)=>(props)=>{
 class InnerComponent extends Component {
   constructor(props){
     super(props)
     this.state={
       path:"",
			 redirectState:null,
     }
   }
   _redirect(path,state){
     this.setState({
        path,
				redirectState:state
     })
   }
   render(){
		 let {redirectState,path} = this.state;
     return(
        (redirectState&&path)?
				<Redirect
					to={{
						pathname:path,
						state: redirectState
					}}/>
				:
				<WrappedComponent
					{...props}
					redirect={(path,state)=>this._redirect(path,state)}
				/>
     )
   }
 }
 return <InnerComponent/>;
}
//检查登录,未登录跳转到登录
const checkLoginRedirect = (WrappedComponent)=>(props)=>{
	class InnerComponent extends Component {
		constructor(props){
			super(props)
			this.state={
				path:"",
				redirectState:null,
			}
		}
		componentWillUpdate(nextProps,nextState){
			 console.log(nextProps);
		}
		render(){
  props.login.user?
				 <Redirect
					 to={{
						 pathname: '/personal/index',
						 state: { from: this.props.location }
					 }}/>
					 :
				 <WrappedComponent
					 {...props}
				 />
		}
	}
	return <InnerComponent/>;
}
export default redirect;
