import ReactDOM, { render } from 'react-dom';
import React, { Component } from 'react';
import {Header} from '../../plugins/components/common/Header';
import {Article} from '../../plugins/components/article/Article';
import {MessageList} from '../../plugins/components/message/Message';
import CommonStyle from '../../css/common/style.css';
class ArticleScreen extends Component{
constructor(props){
  super(props);

}
render(){
  return(<div className="container">

    <Header />
    <Article
      title="hee"
      context="13213123"
      visit="3"
      message="4"
      isLogin="true"
      time="2017-4-15 18:00"/>
    <MessageList/>
	</div>)
    }
    }
ReactDOM.render(<ArticleScreen/>, document.getElementById('container'));
