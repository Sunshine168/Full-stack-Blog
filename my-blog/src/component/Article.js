import React, {
	Component
} from 'react';
import {SplitButton,MenuItem,FormGroup,ControlLabel,FormControl,Button,HelpBlock} from'react-bootstrap';
//考虑成型用draft.js作为文章输入
/*
params of article
title
context
visitCount
messageCount
tiem
 - - -
logic parmas
isCurrent
只有在当前用户的用户页面才有操作的显示项
 */
export const Article = (props)=>{
  return (<div className="article_container">
    <img className="author_logo"/>
		<div className="article_wrap">
			<h3 className="article_title">
	      {props.title}
	    </h3>
	    <div className="article_context">
				<div dangerouslySetInnerHTML={{__html:props.context}}></div>
	    </div>
			<ArticleFoot
				isCurrent={props.isCurrent}
				visit={props.visitCount}
				message={props.messageCount}
				time = {props.time}
			/>
		</div>
  </div>)
}
const ArticleFoot = (props)=>{
	let {post} = props;
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
      {
				props.message?
					<a href="#" className="foot_item">
						留言({props.message})
					</a>
        :null
			}
			{props.isCurrent?(
				<SplitButton bsStyle="link" title="操作"  className="foot_dropDown" id="article-action" pullRight={true}>
					<MenuItem eventKey="1">编辑</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey="2">删除</MenuItem>


				</SplitButton>
			):null}
    </div>
	</div>)
}
//返回表单元素组
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
export default class PostArticle  extends Component{
	constructor(props){
		super(props);
		this.state={
			title:props.title||"",
			context:props.context||"",
		}
	}
	render(){
    let {title,context}  = this.state;
		return (<div className="article_container">
	    <img className="author_logo"/>
			<div className="article_wrap">

		    <section className="article_context">
					<FieldGroup
						id="formControlsText"
						type="text"
						label="标题"
						placeholder="Enter text"
						value={title}
						onChange={(title)=>this.setState(title)}
					/>
					<FormGroup controlId="formControlsTextarea">
						<ControlLabel>内容</ControlLabel>
						<FormControl componentClass="textarea" placeholder="textarea"
							onChange={(context)=>this.setState(context)}
							style={{ height: 200 }}
							value={context}/>
					</FormGroup>
		    </section>
				<Button onClick={()=>this._postArticle()}>发表</Button>
			</div>
	  </div>)
	}
	//发表文章的网络请求
  _postArticle(){
			//检查数据有效性
			let {title,context} = this.state;
			fetch('http://localhost:3005/api/posts',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
	},
			 body: JSON.stringify({
				 title:title,
				 context:context,
				 user_id:"58fb5c4af81289702783067d",
			 })
			})
			.then((response) => {return response.json()})
			.then((responseJson) => {
				console.log(responseJson);
				//处理登录结果
			})
			.catch((e)=>{
				console.log(e);
			})
		}
	}
