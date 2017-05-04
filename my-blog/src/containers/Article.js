import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Article} from '../components/Article';
import {MessageList} from '../components/Message';
import '../css/article.css'
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
