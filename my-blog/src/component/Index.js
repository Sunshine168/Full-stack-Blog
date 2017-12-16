import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import blogImage from '../image/blog.png'
import designImage from '../image/design.png'
import connectImage from '../image/connect.png'
import Footer from './Footer'
import BubbleBG from './BubbleBG'
import '../css/index.css';
/*
 主页只做显示
 */

export default class Index extends Component {
constructor(props){
  super(props)
  this.state = {
    containerWidth:500,
  }
}
componentDidMount(){
   let container = document.getElementById('menu-container');
   this.setState ({
     containerWidth:container.clientWidth
   })
}
  render(){
    return(
      <div className="menu-container" id="menu-container">
        <BubbleBG
          width={this.state.containerWidth}
          height={500}
        />
        <div className="top" >
          <div className="top_context">
            <h1>基于React全家桶的多人BLOG</h1>
            <p className="top_desc">纸上得来终觉浅，绝知此事要躬行</p>
          </div>
        </div>
        <div className="menu">
          <div className="menu_item">
            <a href="https://sunshine168.github.io/resume/" >
              <span className="menu_title">
                关于我
              </span>
              <img src={connectImage} alt=""/>
            </a>
          </div>
          <div className="menu_item">
            <Link to={"/user/59218504eb091853efc9ba67"} >
              <span className="menu_title">
                我的主页
              </span>
              <img src={blogImage} alt=""/>
            </Link>
          </div>
          <div className="menu_item">
            <a href="http://www.jianshu.com/u/3ffd1ef2f53c" >
              <span className="menu_title">
                其他
              </span>
              <img src={designImage} alt=""/>
            </a>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
