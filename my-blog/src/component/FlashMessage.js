import React, {
	Component
} from 'react';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {fadeIn,fadeOut} from 'react-animations';
import Radium from 'radium';
/*
目前构思是通过定时器在5s后使flashmessage消失
目前这个组件还有bug
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
			removeTimer:null,
		}
	}
 componentDidUpdate(){
	 if(this.props.flashMessage.show){
		 if(this.removeTimer){
			  clearTimeout(this.removeTimer)
		 }
		 this.removeTimer = setTimeout(()=>{
	 if(this.props.flashMessage.show){
		 this.props.removeFlashMessage();
	 }
    },5000);
	 }
 }
	render(){
  let {flashMessage} = this.props,
	    flashStyle =  flashMessage.show?styles.fadeIn:styles.fadeOut;
	return (
		<div className="flashMessage_container">
			{flashMessage.show?
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
