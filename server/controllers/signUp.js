const checkNotLogin = require("../middlewares/check").checkNotLogin;
const crypto = require("crypto");
const fs = require("async-file");
const formidable = require("formidable");
const uuidV4 = require("uuid/v4");
const path = require("path");
let UserModel = require("../models/users");
const DEFAULT_AVATAR = "spinner.gif";

function formidablePromise(req, opts) {
  return new Promise(function(resolve, reject) {
    var form = new formidable.IncomingForm(opts);
    form.parse(req, function(err, fields, files) {
      if (err) return reject(err);
      resolve({
        fields: fields,
        files: files
      });
    });
  });
}
module.exports = {
  "GET /home/register": async (ctx) => {

    await ctx.render("home/register");
  },
  "POST /signIn": async (ctx, next) => {
    await checkNotLogin(ctx, next);
    ctx.response.body = ctx.flash.get();
  },
  //注册api
  "POST /api/signUp": async (ctx) => {
    //初始化变量
    let formidableResult,
      avatar = DEFAULT_AVATAR,
      resCode = 200,
      message = "注册成功",
      fileName = DEFAULT_AVATAR,
      dataBuffer,
			base64Data;
    try {
      formidableResult = await formidablePromise(ctx.req)
      //从fromdata中取出数据
      let {
        account,
        username,
        gender,
        bio,
        password,
        pic
      } = formidableResult.fields;
      if (pic) {
        //有上传头像...
        //正则替换base64
        base64Data = pic.replace(/^data:image\/\w+;base64,/, "");
        //转换为数据流
        dataBuffer = new Buffer.alloc(base64Data, "base64");
        //生成文件名
        fileName = uuidV4().replace(/-/g, "");
        //组合出本地存储图片的路径
        avatar = path.resolve(__dirname, `../upload/avatar/${fileName}.png`);
        //组合出存储到数据库的路径
      }

      password = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      let user = {
        account: account,
        name: username,
        password: password,
        gender: gender,
        bio: bio,
        avatar:fileName
      };

      //默认头像用户不需要生成头像
      if (avatar == DEFAULT_AVATAR) {
          await UserModel.create(user);
      } else {
          await Promise.all([
          fs.writeFile(avatar, dataBuffer),
          UserModel.create(user)
        ]);
      }
    } catch (e) {
      if (e.message.match("E11000 duplicate key")) {
        resCode = 500;
        message = "用户名已被占用";
      } else {
        resCode = 500;
        message = "服务器内部错误"
      }
      if (avatar != DEFAULT_AVATAR) {
        let deletePath = path.resolve(__dirname, "../", avatar);
        //注册失败删除头像
        await fs.unlink(deletePath);
      }
    }
    ctx.response.body = {
      resCode,
      message
    };
  },
  "POST /api/checkAccount": async (ctx) => {
    let { account } = ctx.request.body,
      resCode = 200,
      message = "";
    let user = await UserModel.getUserByAccount(account);
    if (user) {
      resCode  = 500;
      message = "用户名已存在";
    }
    ctx.response.body = {
      resCode,
      message
    };
  }
};
