const User = require('../lib/mongo').User;
//安全模式下只暴露公开信息
User.plugin('safyMode',{
  afterFindOne:function(user){
    if(user){
      return {
        avatar:user.avatar,
        bio:user.bio,
        name:user.name,
        _id:user._id
      }
    }
  }
})
module.exports = {
  // 注册一个用户
  create: function create(user) {
    return User.create(user).exec();
  },
  //通过用户名获取用户信息
  getUserByAccount: function getUserByName(account) {
  return User
    .findOne({ account:account  })
    .addCreatedAt()
    .exec();
},
//根据用户id获取用户信息
getUserById:function getUserById(id){
  return User
        .findOne({_id:id})
        .safyMode()
        .exec();

}
};
