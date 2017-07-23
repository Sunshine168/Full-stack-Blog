import React,{Component} from 'react'
import gitSVG from '../image/github2.svg'
const Footer  = ()=>{
  return (
    <div className = "footer">
      <p>
        如果你觉得有意思的话不妨来给我个start 谢谢！
      </p>
      <span className = "webNum">粤ICP备17055627号</span>
      <a href="https://github.com/Sunshine168/Full-stack-Blog">
        <img src={gitSVG} alt = "github" className = "gitLogo"/>
      </a>
      图标资源<a href="http://www.freepik.com">Designed by Photoroyalty / Freepik</a>
    </div>
  )
}
export default Footer;
