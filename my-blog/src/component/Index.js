import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import blogImage from '../image/blog.png'
import designImage from '../image/design.png'
import connectImage from '../image/connect.png'
import Footer from './Footer'
import '../css/index.css';
/*
 主页只做显示
 */

export default class Index extends Component {

componentDidMount(){
let container = document.getElementById('menu-container');
this.particles(container)

}
particles(container){
  /*
  获取dom元素
  原始链接
  https://codepen.io/agathaco/pen/ZyMZyz?editors=1010
   */
    let canvas = document.getElementById('menu-top-canvas'),
    c = canvas.getContext("2d"),
    rect = canvas.getBoundingClientRect();
    /*初始化一个鼠标*/
    var mouse = {
  x: undefined,
  y: undefined
};
/*

 */
/*设定画布大小*/
canvas.height = 500;
canvas.width = container.clientWidth;
// 最大半径
var maxRadius = 30;
// 设置密度
var density = 6;
//例子数量
var numParticles = canvas.height * canvas.width / (density * 100);
/*颜色*/
var colorArray = [
  "#FFF6B5",
  "#F2BA82",
  "#F2A4BF",
  "#D974DB",
  "#9298DD",
  "#3CD0D8"
];
var previouslyScroTop = 0;
/*鼠标移动事件*/
canvas.addEventListener("mousemove", function() {
  if(document.body.scrollTop !== 0){
    //避免第一次调用直接偏移
      //需要考虑垂直偏移
       mouse.x = event.x -  rect.left;
       mouse.y = event.y  - rect.top + document.body.scrollTop;
    previouslyScroTop = document.body.scrollTop
  }else{

    mouse.x = event.x -  rect.left;
    mouse.y = event.y - rect.top ;
  }
});
/*窗体大小变换事件*/
window.addEventListener("resize", function() {
  canvas.height = 500;
  canvas.width = container.clientWidth;
  init();
});
//圆点类
function Circle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.minRadius = r;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
  //绘制
  this.draw = function() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fill();
  };
  //更新圆点
  this.update = function() {
    //圆点超出边界就反方向移动
    if (this.x + this.r > innerWidth || this.x - this.r < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // get distance squared
    var ds =
      (mouse.x - this.x) * (mouse.x - this.x) +
      (mouse.y - this.y) * (mouse.y - this.y);
    // max radius squared
    var rs = 30 * 30;
    // interactivity
    if (ds < rs) {
      // check if withinradius
      if (this.r < maxRadius) {
        // increment based on the distance from mouse (closer faster, further slower)
        this.r += 1 - ds / rs;
      }
    } else if (this.r > this.minRadius) {
      this.r -= 1;
    }
    this.draw();
  };
}

var circleArray = [];

function init() {
  circleArray = [];
  for (var i = 1; i < numParticles; i++) {
    var r = Math.random() * 3 + 1;
    var x = Math.random() * (window.innerWidth - r * 2) + r;
    var y = Math.random() * (window.innerHeight - r * 2) + r;
    var dx = (Math.random() - 0.5) * 0.5;
    var dy = (Math.random() - 0.5) * 0.5;
    circleArray.push(new Circle(x, y, dx, dy, r));
  }
}
init();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 1; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();

}
  render(){
    return(
      <div className="menu-container" id="menu-container">
        <canvas id="menu-top-canvas"></canvas>
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
