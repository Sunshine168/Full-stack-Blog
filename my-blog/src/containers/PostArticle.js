import ReactDOM, { render } from 'react-dom';
import React, { Component } from 'react';
import {Header} from '../../plugins/components/common/Header';
import {PostArticle} from '../../plugins/components/article/Article';
import CommonStyle from '../../css/common/style.css';
export default class PostArticleScreen extends Component{
constructor(props){
  super(props);

}
render(){
  return(<div className="container">
		<div>
			<Header />
      <PostArticle
        title="1111"
        context="12312312"
      />
		</div>
	</div>)
    }
    }
ReactDOM.render(<PostArticleScreen/>, document.getElementById('container'));
