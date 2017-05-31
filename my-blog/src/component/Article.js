import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,Button,HelpBlock} from'react-bootstrap';
import PropTypes from 'prop-types'
//考虑成型用draft.js作为文章输入
 const Article = (props)=>{
		let {article} = props;
	return (
		<div>
			<h3 className="article_title">
				{article.title}
			</h3>
			<div className="article_context">
				<div dangerouslySetInnerHTML={{__html:article.content}}></div>
			</div>
			
		</div>)
}



export default Article;
