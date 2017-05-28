import React, {
	Component
} from 'react';
import {ProgressBar} from'react-bootstrap';
import {addPost,fetchEditPost,updatePost} from '../service/fetch';
import ArticleFoot from './ArticleFoot';
import PropTypes from 'prop-types';

export default class extends Component {
   constructor(props){
     super(props)
		 this.state = {
			 now:0,
		 }
   }
componentDidMount(){
let {isStart,isFinish} = this.props.progress;
if(isStart){
this.increase()
}
if(isFinish){
	this.setState({
		now:100
	})
	clearTimeout(this.timer);
}
}
increase(){
	const now = this.state.now + 1;
	if (now >= 100) {
		clearTimeout(this.timer);
		return;
	}
	this.setState({ now });
	this.timer = setTimeout(()=>{
	this.increase()
}, 10);
}
// componentWillReceiveProps(nextProps){
// 	let {isStart,isFinish}  = nextProps.progress;
// 	console.log(nextProps);
// 	//处理开启进度条并自动增长
// 	if(isStart){
// 		//如果不存在自动增长的计时器就添加一个
// 		console.log(this.timer);
// 		 if(!this.timer){
// 			 console.log("开始")
// 			   this.timer = setInterval(()=>{
// 								 if(this.state.now<99){
// 									 //自动增长不可以超过99
// 									 const now = this.state.now+1;
// 									 this.setState({now});
// 								 }else{
// 									 //进度条到达99清除自身
// 									 clearInterval(this.timer)
// 								 }
//  					},10)
// 		 }else{
// 			  console.log("debug")
// 		 }
// 	}
// 	//完成的标记
// 	if(isFinish){
//       //  //外部网络指令完成手动清除计时器,清除前需要判断计时器是否已经自动完成了
//       //    if(this.timer){clearInterval(this.timer)}
//          this.setState({now:100})
//         //存在的问题是应该isFinish导致组件直接消失了 看不到进度达到100
// 	}
// }

componentWillUnmount(){
	clearTimeout(this.timer);
}
  render(){
		let {isFinish,isStart} = this.props.progress;
    return (
			this.state.now>1&&this.state.now<100?
			<div className="progressbar">
				<ProgressBar active now={this.state.now} />
			</div>
			:null
    )
  }
}
