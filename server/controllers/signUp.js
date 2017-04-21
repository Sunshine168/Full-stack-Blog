const checkNotLogin = require('../middlewares/check').checkNotLogin;
const crypto = require('crypto');
const fs = require('fs');
const hasher = crypto.createHash('md5');
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
	'POST api/signUp':async(ctx,next)=>{
		  let {body,files}=ctx.request;
      let avatar = files.avatar.path.split(path.sep).pop();
			let {name,gender,bio,password}=files;
		  hasher.update(password);
			password = hasher.digest('hex');
			let user = {
				account:account
				name: name,
	      password: password,
	      gender: gender,
	      bio: bio,
	      avatar: avatar
			};
			try{
        let result =  await UserModel.create(user);
				let user = result.ops[0];
				delete user.password;
				ctx.session.user = user;
        ctx.response.body={
					"code":1
				}
			}catch(e){
         fs.unlink(files.avatar.path);
				 if (e.message.match('E11000 duplicate key')) {
					 ctx.response.body={
	 					"code":-1,
						"message":"用户名已被占用"
					}
        }
			}

	}
}
