## 笔记一
## 网络请求与图片上传
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

## koa2

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

## 如何在前端上传预览并上传

通过fromData与FileReader进行图片预览并上传,数据保存在fromData中,通过FileReader将图片转化成base64进行预览。


```js
constructor(props){
  super(props);
  let data = new FormData();
  this.state = {
	formData:data,
}
```

```js
//ui控件来自 react-bootstrap
<Modal show={this.state.showModal} onHide={()=>this._closeModal()}>
<Modal.Header closeButton>
<Modal.Title>上传头像</Modal.Title>
</Modal.Header><Modal.Body>
<FieldGroup
id="upload"
type="file"
label="File"
onChange={(event)=>this._change(event.target.value)}/>
<img src="" alt="" className="previewAvater" id="preview"/>
</Modal.Body>
<Modal.Footer>
<Button onClick={()=>this._confirmAvater()}>确定</Button>
<Button onClick={()=>this._closeModal()}>取消</Button>
</Modal.Footer>
</Modal>

```

```js
//util function 
_change(){
			/*直接操作原生dom对象*/
      let pic = document.getElementById("preview"),
			   file = document.getElementById("upload");

      let valid =/(.jpg|.png|.gif|.jpeg)$/.test(file.value);

     // gif在IE浏览器暂时无法显示
     if(!valid){
         alert("图片的格式必须为png或者jpg或者jpeg格式！");
         return;
     }
    this._html5Reader(file);
}
_html5Reader(file){
			console.log(file)
			 var file = file.files[0];
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function(e){
         var pic = document.getElementById("preview");
         pic.src=this.result;
     }
 }
  _confirmAvater(){
    /*直接操作原生dom对象*/
		let picSrc = document.getElementById("preview").src;
		if(picSrc==""){
			  alert("图片不能为空！");
		}else{
			let formData= this.state.formData;
			formData.append('pic',picSrc)
		}
		//关闭Modal
		this._closeModal()
	}
```

```js
//注册函数负责让register函数提交表单
async _register(){
//检查数据有效性
let formData= this.state.formData;
					 formData.append("account",account);
					 formData.append("username",username);
					 formData.append("password",password);
					 formData.append("gender",gender);
					 formData.append("bio",bio);
					 let result = await register(formData);

}
```

```js
/*register真正提交表单的函数,不需要设置
Content-Type': 'application/x-www-form-urlencoded'
不然反而会提交失败!!!
*/
export const register = async(formData)=>{
   let url = DOMAIN+'/api/signUp';
   try{
     var result = await fetch(url,{
       method: 'POST',
   body:formData
   })
   }catch(e){
     console.log(e);
   }
   if(result){
     return result.json();
   }else{
     return {
      code:-2,
      message:"未知错误"
     }
   }
 }
```


## 前后端分离实践(next)
跨域问题以及跨域附带cookies的问题

前后端分离开发的时候除了mock数据,经常会使用到跨域访问。

### koa2 跨域
使用koa2-cors中间件

```
const cors = require('koa2-cors');
const app = new Koa();
const Koa = require('koa');
app.use(cors({
		origin: config.cors,
		/*允许跨域访问的地址,都允许则设置成"*"  */
	}));
```

如果在跨域的时候运行附带cookies

```
	app.use(cors({
		origin: config.cors,
		"credentials": true,/*允许附带cookies*/
	}));
```

### fetch附带cookies
 
```
const CREDENTIALS ;
//credentials就是fetch附带cookies的opts,同源下使用"same-origin",跨域下使用"include"
 fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
   credentials: CREDENTIALS,
    })
```

ps:

在react单页配合koa2进行开发的时候需要注意的一个小问题,需要在单页的第一次访问就在session中放一个任意数据用作标记。否则cookies是无法种下到浏览器的~ 
单页中后面每次数据交互以json交互,暂时看来不会附带cookies到浏览器上





