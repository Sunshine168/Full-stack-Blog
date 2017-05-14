import React, {
	Component
} from 'react';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {fadeIn,fadeOut} from 'react-animations';
import Radium from 'radium';
/*
目前构思是通过定时器在10s后使flashmessage消失
 */

/*
通过radium结合react-animations来对动画进行控制

 */
 const styles = {
   fadeIn: {
     animation: 'x 3s',
     animationName: Radium.keyframes(fadeIn, 'fadeIn')
   },
	 fadeOut: {
		 animation: 'x 2s',
		 animationName: Radium.keyframes(fadeOut, 'fadeOut')
	 }
 }


@Radium
export default class FlashMessage extends Component{
	static propTypes=({
		flashMessage:PropTypes.object,
		showFlashMessage:PropTypes.func,
		removeFlashMessage:PropTypes.func,
	})
	constructor(props){
		super(props);
		this.state={
			show:props.flashMessage.show,
		}
	}
	componentDidMount(){

	}
	async componentDidUpdate(nextProps,nextState){
		if(this.props.flashMessage.show){
			setTimeout(()=>{
					this.props.removeFlashMessage();
			},5000);
		}
		if(this.state.show)
		{
			return true;
		}else{
			return false;
		}

	}
  componentWillReceiveProps(nextProps){
		this.setState({
			show:nextProps.flashMessage.show,
		})
	}
	render(){
  let {flashMessage} = this.props,
	    flashStyle =  flashMessage.show?styles.fadeIn:styles.fadeOut;
   console.log(this.state.show);
	return (
		<div className="flashMessage_container">
			{this.state.show?
				<div
					style={
						flashStyle
					}>
					<Panel
						header={flashMessage.msg} bsStyle={flashMessage.type}>
					</Panel>
				</div>
				:
				null
			}
				</div>

	 );

	}
}
