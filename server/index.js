const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const route = require('koa-route');
const multer = require('koa-multer');
const session = require('koa2-session-store');
const MongoStore = require('koa2-session-mongolass');
const convert = require('koa-convert');
const path = require('path');
const render = require('koa-ejs');
const flash = require('koa-flash-simple');
const mongoose = require('mongoose');
const server = require('koa-static');
const config = require('config-lite');
const cors = require('koa2-cors');
const uploader = require('koa2-file-upload')
const koaWinston = require('./middlewares/koa-winston');
const app = new Koa();
const isProduction = (process.env.NODE_ENV || 'production') === 'production';
const log = require('./logs/log');
if(!isProduction&&config.cors){
	app.use(cors({
		/*前后端分离时候 运行跨域访问用作 调试*/
		origin: config.cors,
		"credentials": true,
	}));
}
app.use(bodyParser());

app.use(uploader({
	"url": '/api/upload',
	"storeDir": 'img',
	"provider": "local",
	// "mimetypes": ['image/png','image/bmp'], // 如果没有配置,将不进行类型检查 http://www.freeformatter.com/mime-types-list.html
	"folder": "public",
	"urlPath": "images"
}))

app.keys = [config.session.secret];
app.use(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true, // 强制更新 session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore(),
}));
// //通过koa-ejs中间件 也可以直接使用
// app.use(views(path.join(__dirname, './views'), {
//         extension: 'ejs'
//     }))

app.use(convert(server(path.join(__dirname, '/build/'))));
render(app, {
	root: path.join(__dirname, '/build/'),
	layout: false,
	viewExt: 'html',
	cache: false,
	debug: true
});


// app.use(flash());
app.use(async(ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = err.message;
		ctx.app.emit('error', err, ctx);
	}
})
app.use(async(ctx, next) => {
	await next();
	if (ctx.response.status == 404) {
		console.log(ctx.request.url);

		ctx.response.redirect('/?' + ctx.request.url);
	}
})



// 正常请求的日志
app.use(koaWinston(log.logger));
// add controller:
app.use(controller());
// 错误请求的日志
app.use(koaWinston(log.errorloger));


app.listen(config.port);
