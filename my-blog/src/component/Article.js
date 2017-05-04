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
export defualt class PostArticle  extends Component{
	constructor(props){
		super(props);
		this.state={
			title:props.title||"",
			context:props.context||"",
		}
	}
	render(){
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
						onChange={(title)=>this.setState(title)}
					/>
					<FormGroup controlId="formControlsTextarea">
						<ControlLabel>内容</ControlLabel>
						<FormControl componentClass="textarea" placeholder="textarea"
							onChange={(context)=>this.setState(context)}
							style={{ height: 200 }}
							value={props.context}/>
					</FormGroup>
		    </section>
				<Button onclick={()=>this._postArticle()}>发表</Button>
			</div>
	  </div>)
	}
	//发表文章的网络请求
  _postArticle(){
		_signIn(){
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
}
