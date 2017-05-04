import React, { Component } from 'react';
import {Header} from '../component/Header';
import Login from '../component/Login';
import '../css/login.css';
export default class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="container">
				<Login/>
			</div>
		)
	}
}
