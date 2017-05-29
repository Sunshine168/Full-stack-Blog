import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
import {DOMAIN,register,checkAccount} from "../service/fetch";
import PropTypes from 'prop-types'
export default class RegisterInput extends Component {
	static propTypes=({
		showFlashMessage:PropTypes.func,
		redirect:PropTypes.func,
	})
     constructor(props){
			 super(props);

			 this.state = {
				 account:"",
				 password:"",
         nickName:"",
				 confirmPassword:"",
				 gender:"0",
				 bio:"",
				 accountVaild:null,
				 pwdValid:null,
				 cpwdValid:null,
				 unValid:null,
				 accountHelp:"",
				 pwdHelp:"",
				 cpwdHelp:"",
				 unHelp:""
			 }
			//  this._handleAccount.bind(this);
		 }
		 render(){
			    return<div className="loginInputForm">
						<form>
							<FieldGroup
								id="formControlsEmail"
								type="text"
								label= "account"
								placeholder="Enter account"
								ref={(input)=>this.email=input}
								onChange={(event)=>this.setState({account:event.target.value})}
								onBlur={(event)=>this._checkAccount(event.target.value)}
								validationState={this.state.accountVaild}
								help={this.state.accountHelp}
							/>
							<FieldGroup
								id="formControlsPassword"
								label="Password"
								type="password"
								placeholder="Enter Password"
								onChange={(event)=>this.setState({password:event.target.value})}
								onBlur={(event)=>this._checkPassword(event.target.value)}
								validationState={this.state.pwdValid}
								help={this.state.pwdHelp}
							/>
              <FieldGroup
                id="formControlsPassword"
                label="confirmPassword"
                type="password"
                placeholder="Enter confirm Password"
                onChange={(event)=>this.setState({confirmPassword:event.target.value})}
								onBlur={(event)=>this._checkConfirmPassword(event.target.value)}
								validationState={this.state.cpwdValid}
								help={this.state.cpwdHelp}
              />
							<FieldGroup
								id="formControlsPassword"
								label="username"
								type="text"
								placeholder="Enter username"
								onChange={(event)=>this.setState({username:event.target.value})}
								onBlur={(event)=>this._checkUsername(event.target.value)}
								validationState={this.state.unValid}
								help={this.state.unHelp}
							/>
              <FormGroup>
                <ControlLabel>性别</ControlLabel>
                <FormControl componentClass="select" placeholder="性别"
                  onChange={(event)=>this.setState({gender:event.target.value})}>
                  <option value="0">男</option>
                  <option value="1">女</option>
                </FormControl>
              </FormGroup>
              <FieldGroup
                id="formControlsFile"
                type="file"
                label="上传头像"
                help="Example block-level help text here."
              />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl componentClass="textarea" placeholder="个人签名"
                  onChange={(event)=>this.setState({bio:event.target.value})}/>
              </FormGroup>
							<Button bsStyle="primary" bsSize="large" block onClick={()=>this._register()}>signUp</Button>
						</form>
					</div>
		 }
		 /*
     检验账号需要网络请求
		  */
     async _checkAccount(value){
			 /*重设一次*/
			 this.setState({
				 accountVaild:null,
				 accountHelp:"",
			 })
			 if(value.length<6){
				 this.setState({
					 accountVaild:"error",
					 accountHelp:"账号长度需要大于6位"
				 })
			 }else{
				 //网络请求检验账号是否已用
				 let result =await checkAccount(value);
				 if(result.code==1){
					 this.setState({
					 accountVaild:"success",
					 accountHelp:"账号可用"
				 })
			 }else{
				 this.setState({
				 accountVaild:"error",
				 accountHelp:"账号已被使用"
			 })
			 }

			 }
		 }
		 /*检验密码*/
		_checkPassword(value){
			 this.setState({
				pwdValid:null,
				pwdHelp:"",
			})
			 if(value.length<8){
				 this.setState({
					pwdValid:"error",
					pwdHelp:"密码必须大于8位",
				})
			 }else{
				 //网络请求检验账号是否已用
				 this.setState({
					 pwdValid:"success",
				})
			 }
		 }
		 /*检验确认密码*/
		_checkConfirmPassword(value){
			this.setState({
			 cpwdValid:null,
			 cpwdHelp:"",
		 })
			if(this.state.password!=this.state.confirmPassword){
				this.setState({
				 cpwdValid:"error",
				 cpwdHelp:"两次密码必须一样",
			 })
			}else{

				this.setState({
					cpwdValid:"success",
			 })
			}
		}
		/*检验用户账号*/
		_checkUsername(value){
			this.setState({
			 unValid:null,
			 unHelp:"",
		 })
			if(value.length==0){
				this.setState({
				 unValid:"error",
				 unHelp:"用户名不能为空",
			 })
			}else{

				this.setState({
					unValid:"success",
			 })
			}
		}
		 async _register(){
			   //检查数据有效性
			   let {account,username,password,gender,bio, accountVaild,pwdValid,cpwdValid,unValid} = this.state,valid = false;
         if(accountVaild=="success"&&pwdValid=="success"&&cpwdValid=="success"&&unValid=="success"){valid = true}
         if(valid){
					 let result = await register({
					 account,
					 username,
					 password,
					 gender,
					 bio
				 });
				 if(result.code==1){
					this.props.showFlashMessage({
						msg:"注册成功",
						msgType:"success",
					})
					let pathname ='/login',
					redirectState = { from: this.props.location };
					this.props.redirect(pathname,redirectState)
				}else{
					this.props.showFlashMessage({
					 msg:"注册失败",
					 msgType:"danger",
				 })
				}
				 }
		 }
}

function FieldGroup({ id, label, help,validationState, ...props }) {
  return (
    <FormGroup controlId={id}
			validationState={validationState}
		>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
