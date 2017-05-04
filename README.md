# Full-stack-blog
搭建一个基于Koa2的多人blog
参考自https://github.com/nswbmw/N-blog
## 开发环境
开发环境
Nodejs:7.6.0
koa:2.0
MongoDB:3.2.10



## 总体任务

### 1改写项目框架由express->Koa2
### 2前端初始通过模板实现->工程化的react.js
TODO

* [x] 2.1多页面实践
* [x] 2.2redux实践
* [x] 2.3单页面实践
* [ ] 2.4服务器同构


  ---

## express->koa2
**目前进度**

* [x] 工作目录设定
* [x] 依赖模块
* [x] 配置文件
* [x] 路由部分

## koa2

## 更新一下关于react的进度

无论如何也希望在这个月里能完成手头上的所有任务。。
由于多种原因暂时放弃多页面的部分，
直接开始单页构建 
构建使用create-react-app
ejct后通过手动配置`webpack.config.dev.js`

~~~
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel',
        query: {
          "plugins": [
  "transform-decorators-legacy",
  "transform-class-properties"
],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      },
~~~
达成使用装饰器的目的，尝鲜是种个性。。。

目前选择 router4 。。但是据说坑还比较多 有待实践

redux 的使用这个花了比较长时间才理解了个大概。。在实践里面争取尝试更多包括dva，这里记录下几个比较好的资料

[redux中文资料](http://cn.redux.js.org/docs/introduction/index.html)
[redux作者dan的教学视频](https://egghead.io/courses/getting-started-with-redux)配合这个[详细的doc资料](https://github.com/LanceLou/lancelou.github.io/issues/)
[react小书](http://huziketang.com/books/react/)

由于直接跳过flow的实践。。
在完成redux的多种尝试后
以后再尝试MobX的实践。


## 想法 
react作为一个在浏览器和前端实践之间的渲染层。。。所具有的威力是巨大的，这个利器在展示其威力的同时也有巨大的后坐力。。。 可能我比较蠢。。。而且缺少交流。。感觉比较吃力
。。但是无论是其打通sketch和react-vr。。前景都是非常光明的。。。 希望在找工作前能将这个demo 和 对之前写的一个RN demo进行重构。。。
一步一个脚印 生活都是困难的 只能never give up了 。。实在只能这样安慰自己了。。。


