## koa2

###koa2路由
 
在处理路由时候通过一个路由控制器进行扫描路由注册,处理方法来自于[廖雪峰老师的koa2教程](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471133885340dad9058705804899b1cc2d0a10e7dc80000)

路由文件

```
var index = async(ctx, next) => {
	ctx.session.flag = "1";
	await ctx.render('build/index', {
	});
}

module.exports = {
 /*GET方式访问 访问路径 '/'  执行的路由是 index*/
	'GET /': index,
}

```

简单分析一下这个路由控制器是如何运作的

```
const fs = require('fs');
const path = require('path')
/*
@params router 装载的路由(一个router实例)
@params mapping 路由文件
*/
function addMapping(router, mapping) {
  for (var url in mapping) {
     //判断提交方式
    if (url.startsWith('GET')) {
     //获得实际路由路径
      var path = url.substring(4);
      //装载路由
      router.get(path, mapping[url]);
      //log function 
      console.log(`register URL mapping :GET ${path}`);
    } else if (url.startsWith('POST')) {
      var path = url.substr(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping :POST ${path}`);
    } else {
      //log无效路由
      console.log(`invalid URL:${url}`);
    }
  }
}
/*
@params router 装载的路由(一个router实例)
@params mapping 需要扫描的文件夹
*/
function addControllers(router, controllers_dir) {
//因为将路由注册器放在了middlewares文件夹中(具体请看目录结构)所以要处理一下路径
  var filePath = path.resolve(__dirname, '../' + controllers_dir)
  //异步读取目录
  var files = fs.readdirSync(filePath);
  //遍历扫描到的路由文件
  var js_files = files.filter((f) => {
    return f.endsWith('.js');
  });
  for (var f of js_files) {
    console.log(`process controller:${f}...`);
    let mapping = require(filePath + "/" + f);
    addMapping(router, mapping);
  }
}

module.exports = function(dir) {
  let
  //默认的路由文件夹名为'controllers'
    controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录名默认为'controllers'
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};

```






