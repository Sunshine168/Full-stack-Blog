const checkNotLogin = require("../middlewares/check").checkNotLogin;
const crypto = require("crypto");
const fs = require("async-file");
const formidable = require("formidable");
const uuidV4 = require("uuid/v4");
const path = require("path");
let UserModel = require("../models/users");
const DEFAUL_AVATAR = "/avater/spinner.gif";

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
      avater = DEFAUL_AVATAR,
      currentUser,
      code = 1,
      message = "注册成功",
      fileName,
      dataBuffer,
			base64Data,
			avatarPath,
			result
    try {
      (formidableResult = await formidablePromise(ctx.req)),
        (avater = DEFAUL_AVATAR),
        currentUser,
        (code = 1),
        (message = "注册成功"),
        fileName,
        dataBuffer,
        base64Data;
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
        //生成绝对路径
        avatarPath = path.resolve(__dirname, "../");
        //组合出本地存储图片的路径
        avater = path.join(avatarPath, `upload/avater/${fileName}.png`);
        //组合出存储到数据库的路径
        avatarPath = `/avater/${fileName}.png`;
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
        avatar: avatarPath
      };

      //默认头像用户不需要生成头像
      if (avater == DEFAUL_AVATAR) {
        result = await UserModel.create(user);
        currentUser = result.ops[0];
      } else {
        result = await Promise.all([
          fs.writeFile(avater, dataBuffer),
          UserModel.create(user)
        ]);
        currentUser = result[1].ops[0];
      }
      //保存图片和生成用户

      delete user.password;
    } catch (e) {
      if (e.message.match("E11000 duplicate key")) {
        code = -1;
        message = "用户名已被占用";
      } else {
        code = -2;
        message = e.message;
      }
      if (avater != DEFAUL_AVATAR) {
        let deletePath = path.resolve(__dirname, "../", avater);
        //注册失败删除头像
        await fs.unlink(deletePath);
      }
    }
    ctx.response.body = {
      code: code,
      message: message
    };
  },
  "POST /api/checkAccount": async (ctx) => {
    let { account } = ctx.request.body,
      code = "1",
      message = "";
    let user = await UserModel.getUserByAccount(account);
    if (user) {
      code = -1;
      message = "用户名已存在";
    }
    ctx.response.body = {
      code,
      message
    };
  }
};
