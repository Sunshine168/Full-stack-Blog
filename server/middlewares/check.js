module.exports = {
  auth: async (ctx, next, customAuth) => {
    if (!ctx.session.user ||  customAuth && customAuth(ctx)) {
      ctx.body = {
				resCode: 401,
				message:'请登录'
			};
			return false
		}
		return true
  }
};
