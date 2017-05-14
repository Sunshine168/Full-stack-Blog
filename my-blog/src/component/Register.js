import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
export default class RegisterInput extends Component {
     constructor(props){
			 super(props);
			 this.state = {
				 account:"",
				 password:""
			 }
		 }
		 render(){
			    return<div className="loginInputForm">
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
              <FieldGroup
                id="formControlsPassword"
                label="confirmPassword"
                type="password"
                placeholder="Enter confirm Password"
                onChange={(event)=>this.setState({confirmPassword:event.target.value})}
              />
              <FormGroup>

                <ControlLabel>性别</ControlLabel>
                <FormControl componentClass="select" placeholder="性别"
                  onChange={(event)=>this.setState({sex:event.target.value})}>
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
                  onChange={(event)=>this.setState({personInroduce:event.target.value})}/>
              </FormGroup>
							<Button bsStyle="primary" bsSize="large" block onClick={()=>this._test()}>LoginIn</Button>
						</form>
					</div>
		 }
     _test(){
       console.log(this.state);
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
