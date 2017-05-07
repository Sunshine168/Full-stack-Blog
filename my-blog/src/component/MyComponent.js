import React, {
	Component
} from 'react';
import {Panel} from 'react-bootstrap';
export  const FlashMessage = (props)=>{
	   let flashMessage =props.flashMessage;
    return(
			flashMessage.show?
     <Panel header={flashMessage.msg} bsStyle={flashMessage.type}>
			 {flashMessage.msg}
     </Panel>
		 :null
	 )

}
