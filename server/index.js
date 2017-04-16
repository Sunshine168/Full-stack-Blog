const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const route = require('koa-route');
const multer = require('koa-multer');
const session = require('koa-session-store');
const convert = require('koa-convert');
const path = require('path');
const render = require('koa-ejs');
const flash = require('koa-flash-simple');
const mongoStore = require('koa-session-mongo');
const server = require('koa-static');
const config = require('config-lite');
const app = new Koa();
const isProduction = (process.env.NODE_ENV || 'production') === 'production';
const formidable=require('koa2-formidable')

app.use(formidable({
	uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}))
app.use(convert(server(__dirname + '/public/')));

//通过koa-ejs中间件 也可以直接使用
// app.use(views(path.join(__dirname, './views'), {
//         extension: 'ejs'
//     }))
render(app, {
	root: path.join(__dirname, 'views'),
	layout: false,
	viewExt: 'html',
	cache: false,
	debug: true
});

app.use(convert(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true, // 强制更新 session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
		maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: mongoStore.create({
		db: 'myBlog-session'
	})
})));
app.use(flash());
app.use(async(ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = err.message;
		ctx.app.emit('error', err, ctx);
	}
})

// log request URL:
app.use(async(ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	var
		start = new Date().getTime(),
		execTime;
	await next();
	execTime = new Date().getTime() - start;
	ctx.response.set('X-Response-Time', `${execTime}ms`);
});


// add controller:
app.use(controller());

app.use(async(ctx, next) => {
	if (ctx.response.status == 500) {
		ctx.response.body = "error handle";
	}
});
app.listen(config.port);
