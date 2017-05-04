import React, {
	Component
} from 'react';
export default class AriticleList extends Component{
constructor(props){
  super(props);

}
render(){
  return(<div>
    <h3>heelo</h3>
    <div></div>
  </div>)
    }
    }
const Ariticle = (props)=>{
  return (<div className="ariticle_container">
    <h3 className="ariticle_title">
      hello
    </h3>
    <section className="ariticle_content">

    </section>

  </div>)
}
const AriticleFoot = (props)=>{
  return (<div className="ariticle_foot">
    <div className="foot_left">
      <a href="#" className="foot_item">
        {props.time}
      </a>
    </div>
    <div className="foot_right">
      <a href="#" className="foot_item">
        浏览({props.visit})
      </a>
      <a href="#" className="foot_item">
        留言({props.message})
      </a>

    </div>
    </div>)
}
