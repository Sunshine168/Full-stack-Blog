import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
export default class BubbleBG extends Component {
  default
  static propTypes=({
    width:PropTypes.number,
    height:PropTypes.number,
  })
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const context = findDOMNode(this).getContext('2d')
    const {width,height} = this.props
    this.particles(width,height,context)
  }
  componentDidUpdate(){

  }
  particles(width,height,context,config={}){
    /*
    获取dom元素
    原始链接
    https://codepen.io/agathaco/pen/ZyMZyz?editors=1010
     */
      let element = findDOMNode(this),
          rect = element.getBoundingClientRect();
      /*初始化一个鼠标*/
      var mouse = {
    x: undefined,
    y: undefined
  };
  // 最大半径
  var maxRadius = config.maxRadius || 30;
  // 设置密度
  var density = config.density || 6;
  //例子数量
  var numParticles = height * width / (density * 100);
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
  var c = context;
  /*鼠标移动事件*/
  element.addEventListener("mousemove", function() {
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
    this.height = 500;
    this.width = width;
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
    const { width,height } = this.props
    return   <canvas width={width} height={height} id="menu-top-canvas">你的浏览器还不支持canvas赶紧换一个吧~</canvas>
  }
}
