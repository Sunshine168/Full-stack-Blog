import ReactDOM, { render } from 'react-dom';
import React, { Component } from 'react';
import LoginInput from '../../plugins/components/home/Login';
import {Header} from '../../plugins/components/common/Header';
import CommonStyle from '../../css/common/style.css';
class LoginScreen extends Component {
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

ReactDOM.render(<LoginScreen />, document.getElementById('container'));
