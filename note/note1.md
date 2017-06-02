## 笔记一
## 网络请求
### 前端使用fetch发起网络请求
[fetch api](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) 
目前fetch只支持现代浏览器,如果需要在还不支持的浏览器中使用需要使用fetch  polyfill
而create-react-app的脚手架已经默认配置好了fetch  polyfill
在await/async下使用了fetch当网络请求
eg:
post序列化的json数据

```
 export const test = async(params)=>{
   try{
    var result = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      params
  }),
    })
  }catch(e){
    //处理异常
    console.log(e);
  }
  if(result){
   //response.json()同样会返回一个Promise对象
    return result.json();
  }else{
     /**/
  }
 }
 
 //使用的时候
    async function(){
       var result = await test({test:1})
       console.log(result)
    }
 
```
如果需要使用FormData的时候及通过post上传文件或者base64数据,不需要声明请求头，因为FormData默认已经是表单形式进行上传

```
 var formData = new FormData(),
     account = "test1";
 formData.append("account",account);
 var result = await fetch(url,
   {
    method: 'POST',
   body:formData
   })
   
```

##koa2

在Koa2中处理网络请求

simple eg:

```
const Koa = require('koa');
const router = require('koa-router')()
const app = new Koa();
//获取post数据需要用的中间件(不支持FormData)
app.use(bodyParser());
app.use(async(ctx, next) => {
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
});

//加载routes
app.use(router.routes())
	//独立处理文件上传的api
router.post('/api/test', async(ctx, next) => {    
     //获取post数据,获取提交字段是test的数据
     let data = ctx.body.test,
     //获取get过来的数据(附带在url上),获取提交字段是test2的数据
     data2 =ctx.query.test2;
     ctx.response.body="end"
})

app.listen(3001);
console.log("app start at port 3001");
```

处理FormData数据(包括文件上传)

在koa2中处理通过FormData上传的数据可以使用formidable中间件

eg1:

```
//导入koa
const Koa = require('koa');
const formidable = require("formidable");
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
//创建一个koa对象
const app = new Koa();
app.use(async(ctx, next) => {
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
});
//加载routes
app.use(router.routes())
	//独立处理文件上传的api
router.post('/api/upload', async(ctx, next) => {
		var form = new formidable.IncomingForm();
		form.parse(ctx.req, async function(err, fields, files) {
			//上传的数据放在fields,文件放在files中,目前只尝试图片转base64然后base64再转回图片上传(ps:图片转base64可能会变大了,这种上传方式合不合理有待商榷)
			//取出formdata中的数据,假如提交了tes1,test2,和一个名为base64的base64数据
			if (err) {
				return err
			}
			let {
				test1,
				test2,
				base64
			} = fields;
			//test1,test2,base64就是提交的数据了
			  ctx.response.body="end"
		});
	})
	//处理其他url
app.listen(3001);
console.log("app start at port 3001");

```

eg1里面是存在一个问题,这个问题也是比较困扰我的,
form.parse()如果该里面处理一定多量的异步数据流的时候 在回调中的ctx.response.body="end" 是无法触发的

```
	var form = new formidable.IncomingForm();
	form.parse(ctx.req, async function(err, fields, files) {
	//any await process
	ctx.response.body="end"//did not work
	}))
	
```
所以为了避免这样的情况要做出以下改进

```
//使用Promise的formidable
function formidablePromise (req, opts) {
  return new Promise(function (resolve, reject) {
    var form = new formidable.IncomingForm(opts)
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err)
      resolve({ fields: fields, files: files })
    })
  })
}

router.post('/api/upload', async(ctx, next) => {
		try{
		     var formidableResult = await form.parse(ctx.req);
			let {
				test1,
				test2,
				base64
			} = formidableResult.fields;
		}
	})

```


##前后端分离实践(next)
跨域问题以及跨域附带cookies的问题










