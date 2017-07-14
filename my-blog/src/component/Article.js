import React, {
	Component
} from 'react';
import classNames from 'classnames';
import {FormGroup,ControlLabel,FormControl,Button,HelpBlock} from'react-bootstrap';
import PropTypes from 'prop-types'
 const Article = (props)=>{
		let {article,isDetail} = props,
		 articleClass  = classNames('article_context',{'ellipsis':isDetail===false})
	return (
		<div>
			<h3 className="article_title">
				{article.title}
			</h3>
			<div className={articleClass}>
				<div dangerouslySetInnerHTML={{__html:article.content}}></div>
			</div>

		</div>)
}



export default Article;
