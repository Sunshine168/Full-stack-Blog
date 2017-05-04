import React, { Component } from 'react';
import Register from '../component/Register';
export default class RegisterScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="container">
				<Register/>
			</div>
		)
	}
}
