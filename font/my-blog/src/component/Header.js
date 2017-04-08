import React, {
	Component
} from 'react';
import '../css/common.css';
import '../Login.css';
import {Navbar,Nav,NavDropdown,NavItem,MenuItem,PageHeader} from'react-bootstrap';
const navbarInstance = (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">BLOG</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight className="nav_action">
        <NavDropdown  eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  </div>
);
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
       {navbarInstance}

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
