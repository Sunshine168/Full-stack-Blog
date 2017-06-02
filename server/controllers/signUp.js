const checkNotLogin = require('../middlewares/check').checkNotLogin;
const crypto = require('crypto');
const fs = require('async-file');
const formidable = require("formidable");
const uuidV4 = require('uuid/v4');
const path = require('path');
let UserModel = require('../models/users');
function formidablePromise (req, opts) {
  return new Promise(function (resolve, reject) {
    var form = new formidable.IncomingForm(opts)
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err)
      resolve({ fields: fields, files: files })
    })
  })
}
module.exports = {
	'GET /home/register': async(ctx, next) => {
		// await checkNotLogin(ctx, next);
		// ctx.response.body = ctx.flash.get();
	await ctx.render('home/register');
	},
	'POST /signIn': async(ctx, next) => {
		await checkNotLogin(ctx, next);
		ctx.response.body = ctx.flash.get();
	},
	//注册api
	'POST /api/signUp':async(ctx,next)=>{
		try{
			var formidableResult = await formidablePromise(ctx.req);
			//从fromdata中取出数据
			let {account,username,gender,bio,password,pic} = formidableResult.fields;
			 //正则替换base64
		   let base64Data = pic.replace(/^data:image\/\w+;base64,/, "");
		   //转换为数据流
		   let dataBuffer = new Buffer(base64Data, 'base64');
			 //生成文件名
			 var fileName = uuidV4().replace(/-/g, ""),
			 code="1",
			 message="注册成功";
			 //生成绝对路径
			 var avatarPath = path.resolve(__dirname,"../"),
			 //组合出本地存储图片的路径
							 avater = path.join(avatarPath, `/avater/${fileName}.png`);
			 password = crypto.createHash('md5').update(password).digest('hex');
			 let user = {
				 account:account,
				 name: username,
				 password: password,
				 gender: gender,
				 bio: bio,
				 avatar: `/avater/${fileName}.png`
			 };
			 //保存图片和生成用户
				 result = await Promise.all([fs.writeFile(avater, dataBuffer),UserModel.create(user)])
				 var currentUser = result[1].ops[0];
				 delete user.password;
				 ctx.session.user = user;
		}catch(e){
			if (e.message.match('E11000 duplicate key')) {
				 code=-1;
				 message="用户名已被占用"
			}else{
			 code=-2;
			 message=e.message
		 }
		 //注册失败删除头像
		 await fs.unlink("/upload/"+avater);
		}
		ctx.response.body={
				"code":code,
				"message":message,
			}
	},
	'POST /api/checkAccount':async(ctx,next)=>{
		let {account} =ctx.request.body,code="1",message="";
		let user = await UserModel.getUserByAccount(account);
		if(user){
			code=-1;
			message="用户名已存在"
		}
		ctx.response.body={
			code,
			message,
		}
	}

}
