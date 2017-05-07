import React, {
	Component,
} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types'
import {Navbar,Nav,NavDropdown,NavItem,MenuItem,PageHeader} from'react-bootstrap';
const afterLoginAction = [{title:"个人主页",evenKey:"2",href:"/personal"},{title:"发表文章",evenKey:"2.1",href:"/postArticle"},{title:"退出登录",evenKey:"2.2",href:"/loginOut"}]
const beforeLoginAction = [{title:"登录",evenKey:"3",href:"/login"},{title:"注册",evenKey:"3.1",href:"/register"}]
const NavbarInstance = (props)=>{
             return(
             <div>
               <Navbar>
                 <Navbar.Header>
                   <Navbar.Brand>
                     <a href="#">BLOG</a>
                   </Navbar.Brand>
                 </Navbar.Header>
                 <Nav pullRight className="nav_action">
                   <NavDropdown  eventKey={3} title="操作" id="basic-nav-dropdown" onSelect={eventKey=>props.dropDownEvent(eventKey)}>
                     {props.actionsList.map(item => (
											 <LinkContainer to={item.href} key={item.evenKey}>
												 <NavItem key={item.evenKey} eventKey={item.evenKey}>{item.title}</NavItem>
											 </LinkContainer>
                     ))}
                   </NavDropdown>
								 </Nav>
							 </Navbar>
    </div>
  )
}

const NavHeader = (props)=>{
  return <div  className="content_center">
    <PageHeader>
      {props.title}<small>{props.introduce}</small>
    </PageHeader>

  </div>;
}

export class Header extends Component{
static propTypes={
	login:PropTypes.object,
	loginOut:PropTypes.func,
}
constructor(props){
  super(props);
  this.state={
      blogTitle :"MyBolg",
      blogIntroduce:"introduce"
  }
}
dropDownHandler(key){
//通过Key判断下拉栏选中状态
if(key=="2.2"){
this.props.loginOut();
}

}
render(){
	let {login} = this.props;
  return(
     <div>
       <NavbarInstance actionsList={login.user?afterLoginAction:beforeLoginAction}
				 dropDownEvent= {(key)=>this.dropDownHandler(key)}
			 />

       <NavHeader
         title={this.state.blogTitle}
         introduce={this.state.blogIntroduce}

       />

     </div>
)
}

}

// const Nav =(props)=>{
// return (<div>
//   <h1 className="header_title">{props.title}</h1>
//   <p>{props.introduce}</p>
// </div>)
// }
