import ReactDOM, { render } from 'react-dom';
import React, { Component } from 'react';
import RegisterInput from '../../plugins/components/home/Register';
import {Header} from '../../plugins/components/common/Header';
import CommonStyle from '../../css/common/style.css';
exports default class RegisterScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="container">
				<Header/>
				<RegisterInput/>
			</div>
		)
	}
}
ReactDOM.render(<RegisterScreen />, document.getElementById('container'));
