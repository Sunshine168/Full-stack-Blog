# Full-stack-blog(不断更新笔记)
[效果Demo](http://sunnerrrr.cn:3005/)
![](./media/blog.gif)
(有待进一步完善,组件之间功能划分应该明确,希望不断学习进步！)
搭建一个基于Koa2的多人blog
功能(登录注册上传头像,发表博文,发表留言)
参考自https://github.com/nswbmw/N-blog
前端部分以create-react-app的脚手架搭起react+react-router v4+redux的全家桶
后端采用koa2+mongodb
## 实践笔记
### [笔记目录](https://github.com/Sunshine168/Full-stack-Blog/blob/master/note/noteMenu.md)
## 开发环境
开发环境(node要求 7.6以上)
Nodejs:7.6.0
koa:2.0
MongoDB:3.2.10

## 目录结构

## 如何运行

后端默认配置在config/default.js中
请确保本地Mongodb 端口27017(默认)可用

```
git clone https://github.com/Sunshine168/Full-stack-Blog.git
cd Full-stack-Blog/myblog
npm install //or yarn install
npm run build //or yarn build
node publish  //发布到server目录中
cd ..
cd server/
npm install //or yarn install
node index //默认3305端口
//open localhost:3305/
```

## 调试配置


### 前后端分离配置(默认不需要配置)

(需要整体运行一下项目产生一下cookies)
#### 前端修改
进入myblog目录进入config的env文件里修改

```
 'ORIGIN':'http://localhost:3005'
//修改一下本地主机
```
#### 后端修改
进入server目录下

```
config/default.js//默认配置文件
```
修改cors,修改成前端运行的域名,默认指向3000端口

```
node index -c
```

### 前后端分离方案

#### 前端使用proxy做代理转发

```
 //在package.json中加入proxy字段,并更换域名即可
"proxy":"http://localhost:3005"
```

#### 后端无需改动


```
node index //启动即可
```

## 总体任务

### 1改写项目框架由express->Koa2
### 2前端->工程化的react项目
TODO

* [ ] 重写布局css
* [ ] 重写博文模块
* [ ] 升级依赖


---

## express->koa2
**目前进度**

* [x] 工作目录设定
* [x] 依赖模块
* [x] 配置文件
* [x] 路由部分
* [x] 数据库访问
* [x] 处理react单页重定向
* [ ] 单元测试
* [ ] 重写博文模块






