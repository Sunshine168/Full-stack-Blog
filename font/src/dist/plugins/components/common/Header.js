import React, {
	Component
} from 'react';
import {Navbar,Nav,NavDropdown,NavItem,MenuItem,PageHeader} from'react-bootstrap';
const afterLoginAction = [{title:"个人主页",evenKey:"2"},{title:"发表文章",evenKey:"2.1"},{title:"退出登录",evenKey:"2.2"}]
const beforeLoginAction = [{title:"登录",evenKey:"3"},{title:"注册",evenKey:"3.1"}]
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
                   <NavDropdown  eventKey={3} title="操作" id="basic-nav-dropdown">

                     {props.actionsList.map(item => (
                       <NavItem key={item.evenKey} eventKey={item.evenKey}>{item.title}</NavItem>
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
constructor(props){
  super(props);
  this.state={
      blogTitle :"MyBolg",
      blogIntroduce:"introduce"
  }
}
render(){
  return(
     <div>
       <NavbarInstance actionsList={afterLoginAction}/>

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
