module.exports = {
	port: 80,
	secretKey:"maizi",
	session: {
		secret: 'myblog',
		key: 'myblog',
		maxAge: '2592000000'
	},
	mongodb: 'mongodb://localhost:27017/myblog',
	cors:"http://localhost:3000",
}
