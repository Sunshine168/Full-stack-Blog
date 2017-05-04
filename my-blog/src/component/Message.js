import React, {
	Component
} from 'react';
import {ListGroup,ListGroupItem,Panel} from 'react-bootstrap';
export const MessageList =(props)=>{
  return (<Panel header="留言">
    <ListGroup>
      <Message
        authorName="mai"
        time="2017-4-11"
        context="板凳"
      />
    </ListGroup>
  </Panel>)
}
const Message =(props)=>{
  return(<ListGroupItem href="link1">
    <img src="" className="author_logo"/>
    <div className="message_detail">
      <h5>{props.authorName}<span>{props.time}</span></h5>
      <div className="message_context">
        {props.context}
      </div>
    </div>
  </ListGroupItem>)
}

export const MessageInput=(props)=>{

}
