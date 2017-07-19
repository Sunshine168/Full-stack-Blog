import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
export default class LoginInput extends Component  {
	static propTypes=({
		user:PropTypes.object,
		loginIn:PropTypes.func,
	})
     constructor(props){
			 super(props);
			 this.state = {
				 account:"",
				 password:"",
				 loading:false,
			 }
		 }
		async _signIn(){
			 //检查数据有效性
			 let {account,password,accountValid,pwdValid} = this.state,
			 valid=false;
			 this._checkAccount(this.state.account)
			 this._checkPassword(this.state.password)
			 if(accountValid == "success"&&pwdValid == "success"){valid=true}
        if(valid){
				  	await this.props.loginIn({account,password})
				}
		 }
		_checkAccount(value){
			/*重设一次*/
			this.setState({
				accountValid:null,
				accountHelp:"",
			})
			if(value.length<6){
				this.setState({
					accountValid:"error",
					accountHelp:"账号长度需要大于6位"
				})
			}else{
				this.setState({
					accountValid:"success",
				})
			}
		}
		_checkPassword(value){
			/*重设一次*/
			this.setState({
				pwdValid:null,
				pwdHelp:"",
			})
			if(value.length<8){
				this.setState({
					pwdValid:"error",
					pwdHelp:"密码长度需要大于8位"
				})
			}else{
				this.setState({
					pwdValid:"success",
				})
			}
		}
		 render(){
      let {user,location} = this.props;
			if(user){
					return(
					<Redirect to={{
						pathname: 'personal/index',
						state: { from:location }
					}}/>)
				}
     return (
            <div className="content_wrap">
							<form>
								<FieldGroup
									id="formControlsEmail"
									type="email"
									label="Email address"
									placeholder="Enter email"
									ref={(input)=>this.email=input}
									onChange={(event)=>this.setState({account:event.target.value})}
									onBlur={(event)=>this._checkAccount(event.target.value)}
									validationState={this.state.accountValid}
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
								<Button disabled={this.props.loading} bsStyle="primary" bsSize="large" block onClick={()=>this._signIn()}>LoginIn</Button>
							</form>
						</div>
					)
		 }
}

function FieldGroup({ id, label, help,validationState, ...props }) {
  return (
    <FormGroup
			controlId={id}
			validationState={validationState}
		>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
