import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
import {DOMAIN} from "../service/fetch";
import PropTypes from 'prop-types'
export default class RegisterInput extends Component {
	static propTypes=({
		showFlashMessage:PropTypes.func,
		redirect:PropTypes.func,
	})
     constructor(props){
			 super(props);
			 console.log(props);
			 this.state = {
				 account:"",
				 password:"",
         nickName:"",
				 confirmPassword:"",
				 gender:"0",
				 bio:"",
			 }
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
							/>
							<FieldGroup
								id="formControlsPassword"
								label="Password"
								type="password"
								placeholder="Enter Password"
								onChange={(event)=>this.setState({password:event.target.value})}
							/>
              <FieldGroup
                id="formControlsPassword"
                label="confirmPassword"
                type="password"
                placeholder="Enter confirm Password"
                onChange={(event)=>this.setState({confirmPassword:event.target.value})}
              />
							<FieldGroup
								id="formControlsPassword"
								label="username"
								type="text"
								placeholder="Enter username"
								onChange={(event)=>this.setState({username:event.target.value})}
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
							<Button bsStyle="primary" bsSize="large" block onClick={()=>this._fetchRegister()}>signUp</Button>
						</form>
					</div>
		 }
		 async _fetchRegister(){
			 let url = DOMAIN+"/api/signUp",
			 {account,username,password,gender,bio} = this.state;
			 try{
		     var result = await fetch(url,{
		       method: 'POST',
		       headers: {
		         'Accept': 'application/json',
		         'Content-Type': 'application/json'
		   },
			 body: JSON.stringify({
				 account:account,
				 username: username,
				 password: password,
				 gender: gender,
				 bio: bio,
			 })
		 })
		   }catch(e){
		     console.log(e);
		   }
			let json = await result.json();
			console.log(json);
       if(json.code==1){
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

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
