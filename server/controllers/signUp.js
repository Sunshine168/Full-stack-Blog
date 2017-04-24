const checkNotLogin = require('../middlewares/check').checkNotLogin;
const crypto = require('crypto');
const fs = require('fs');
let UserModel = require('../models/users');
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
		  let {body}=ctx.request;
      // let avatar = files.avatar.path.split(path.sep).pop();
			let {account,username,gender,bio,password}=body;
			password = crypto.createHash('md5').update(password).digest('hex');
			let user = {
				account:account,
				name: username,
	      password: password,
	      gender: gender,
	      bio: bio,
	      avatar: "avatar"
			},code="1",message="注册成功";
			try{
        let result =  await UserModel.create(user);
				let currentUser = result.ops[0];
				console.log(currentUser);
				delete user.password;
				ctx.session.user = user;
			}catch(e){
        //  fs.unlink(files.avatar.path);
				 if (e.message.match('E11000 duplicate key')) {
	 					code=-1;
						message="用户名已被占用"
        }else{
					console.log(e.message);
				  code=-2;
					message=e.message
				}
			}
			//返回代码和用户名
			ctx.response.body={
				"code":code,
				"message":message,
				"username":user.username,
			}

	}
}
