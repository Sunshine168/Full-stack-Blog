import React, {
	Component
} from 'react';
import {Header} from'./Header';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button,Panel} from 'react-bootstrap';
import {FlashMessage} from './MyComponent';
export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="container">
				<Header/>
				<LoginInput/>
			</div>
		)
	}
}
class LoginInput extends Component {
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
