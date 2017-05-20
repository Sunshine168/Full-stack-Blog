import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
import PropTypes from 'prop-types'
import {Redirect} from'react-router-dom';
import {login} from '../service/fetch';
export default class LoginInput extends Component  {
	static propTypes=({
		user:PropTypes.object,
		loginIn:PropTypes.func,
		showFlashMessage:PropTypes.func,
		removeFlashMessage:PropTypes.func,
		redirect:PropTypes.func,
	})
     constructor(props){
			 super(props);
			 this.state = {
				 account:"",
				 password:""
			 }
		 }
		 componentDidMount(){

		 }
		async _signIn(){
			 //检查数据有效性
			 let {account,password} = this.state;
        let result =await login({
					account,
					password
				})
				 //处理登录结果
				 if(result.code==1){
					 this.props.loginIn(result.user);//更新用户状态
					 this.props.showFlashMessage({
						 msg:"登录成功",
						 msgType:"success",
					 })
				 }else{
					 this.props.showFlashMessage({//返回失败信息
						msg:result.message,
						msgType:"danger",
					})
				 }
		 }
		componentWillUpdate(nextProps,nextState){
				 if(nextProps.user){
					 if(this.props.location.state){
						 //从外部因为需要登录跳转过来的逻辑
						var pathname =  this.props.location.state.from.pathname;

					 }else{
						 //直接登录
						 var pathname = '/personal/index';
					 }
					 let redirectState = { from: this.props.location };
					 this.props.redirect(pathname,redirectState)
				 }
				//  if(this.props.login.user){
				// 	this.props.showFlashMessage({
				// 		msgType:"danger",
				// 		msg:"已经登录",
				// 	})
				// }
		}
		 render(){
			 let loginStatus = this.props.user;
			    return (
            <div className="loginInputForm">
								<form>
									<FieldGroup
										id="formControlsEmail"
										type="email"
										label="Email address"
										placeholder="Enter email"
										ref={(input)=>this.email=input}
										onChange={(event)=>this.setState({account:event.target.value})}
									/>
									<FieldGroup
										id="formControlsPassword"
										label="Password"
										type="password"
										placeholder="Enter Password"
										onChange={(event)=>this.setState({password:event.target.value})}
									/>
									<Button bsStyle="primary" bsSize="large" block onClick={()=>this._signIn()}>LoginIn</Button>
						</form>
					</div>)
		 }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
