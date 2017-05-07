import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
import PropTypes from 'prop-types'
import {Redirect} from'react-router-dom';
export default class LoginInput extends Component  {
	static propTypes=({
		login:PropTypes.object,
		loginIn:PropTypes.func,
		showFlashMessage:PropTypes.func,
		removeFlashMessage:PropTypes.func,
	})
     constructor(props){
			 super(props);
			 this.state = {
				 account:"",
				 password:""
			 }
		 }
		 componentDidMount(){
			 if(this.props.login.user){
				 console.log(this.props.showFlashMessage)
				 this.props.showFlashMessage({
					 msgType:"danger",
					 msg:"已经登录",
				 })
			 }
		 }
		 _signIn(){
			 //检查数据有效性
			 let {account,password} = this.state;
			 fetch('http://localhost:3005/api/signIn',{
				 method: 'POST',
				 headers: {
					 'Accept': 'application/json',
					 'Content-Type': 'application/json'
	},
				body: JSON.stringify({
					account: account,
					password:password,
				})
			 })
			 .then((response) => {return response.json()})
			 .then((responseJson) => {
				 //处理登录结果
				 if(responseJson.code==1){
					 this.props.loginIn(responseJson.user);//更新用户状态
					 this.props.showFlashMessage({
						 msg:"登录成功",
						 msgType:"success",
					 })
				 }else{
					 this.props.showFlashMessage({
						msg:responseJson.message,
						msgType:"danger",
					})
				 }
			 })
			 .catch((e)=>{
				 console.log(e);
			 })
		 }
		 render(){
			 let loginStatus = this.props.login.user;
			    return (loginStatus?
						<Redirect
							to={{
								 pathname: '/personal/index',
								state: { from: this.props.location }
							}}/>
							:<div className="loginInputForm">
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