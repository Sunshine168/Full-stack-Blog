import React, {Component} from 'react'
import LoadArticle from './LoadArticle'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
export default class AccessArticle extends Component {
  static propTypes = ({
    user:PropTypes.string,
    fetchArticle:PropTypes.func
  })
  constructor(props){
    super(props);
    this.state= {
      current:null,
      article:null,
      comments:[]
    }
  }
  async componentDidMount(){
    let {articleId} = this.props.match.params,
        {user,fetchArticle} = this.props;
        await fetchArticle(articleId);
    }
    render(){
      let {article,current,location}  = this.props;
      if(!article){
        return<Redirect
          to={{
            pathname: '/404/',
            state: { from: location }
          }}
              />
      }
      return(<LoadArticle
        article={article}
        currentUser={current}
             />)
    }
}
