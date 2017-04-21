import React, {
	Component
} from 'react';
import {Header} from '../common/Header';
import {SplitButton,MenuItem,FormGroup,ControlLabel,FormControl,Button} from'react-bootstrap';
import Style from '../../../css/article/style.css';
export const Article = (props)=>{
  return (<div className="article_container">
    <img className="author_logo"/>
		<div className="article_wrap">
			<h3 className="article_title">
	      {props.title}
	    </h3>
	    <section className="article_context">
				{props.context}
	    </section>
			<ArticleFoot
				isLogin={props.isLogin}
				visit={props.visit}
				message={props.message}
				time = {props.time}
			/>
		</div>
  </div>)
}
const ArticleFoot = (props)=>{
  return (<div className="article_foot">
    <div className="foot_left">
      <a href="#" className="foot_item">
        {props.time}
      </a>
    </div>
    <div className="foot_right">
      <a href="#" className="foot_item">
        浏览({props.visit})
      </a>
      <a href="#" className="foot_item">
        留言({props.message})
      </a>
			{props.isLogin?(<a href="#" className="foot_item">
				<SplitButton bsStyle="link" title="操作"  className="foot_dropDown" id="article-action" pullRight={true}>
					<MenuItem eventKey="1">编辑</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey="2">删除</MenuItem>


				</SplitButton>
			</a>):null}
    </div>
	</div>)
}
export const PostArticle = (props)=>{
	return (<div className="article_container">
    <img className="author_logo"/>
		<div className="article_wrap">

	    <section className="article_context">
				<FieldGroup
					id="formControlsText"
					type="text"
					label="标题"
					placeholder="Enter text"
					value={props.title}
				/>
				<FormGroup controlId="formControlsTextarea">
					<ControlLabel>内容</ControlLabel>
					<FormControl componentClass="textarea" placeholder="textarea"
						style={{ height: 200 }}
						value={props.context}/>
				</FormGroup>
	    </section>
			<Button>发表</Button>
		</div>
  </div>)
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
