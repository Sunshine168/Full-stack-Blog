import React, {
	Component
} from 'react';
import {Panel} from 'react-bootstrap';
export  const FlashMessage = (props)=>{
  if(props.success){
    return(
     <Panel header={props.success} bsStyle="success">
			 {props.success}
     </Panel>
	 )
  }
	if(props.fail){
		return(
			<Panel header={props.fail} bsStyle="danger">

			</Panel>
		)
	}
  return null;
}
