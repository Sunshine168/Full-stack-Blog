import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button,Panel} from 'react-bootstrap';
import {FlashMessage} from '../common/MyComponent';
import Style from '../../../css/home/style.css';
export default class LoginInput extends Component {
     constructor(props){
			 super(props);
			 this.state = {
				 account:"",
				 password:""
			 }
		 }
		 render(){
			    return<div className="loginInputForm">
						<FlashMessage/>
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
							<Button bsStyle="primary" bsSize="large" block>LoginIn</Button>
						</form>
					</div>
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
