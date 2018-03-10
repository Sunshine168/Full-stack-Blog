module.exports = {
	port: 3000,
	secretKey: "maizi",
	session: {
		secret: 'myblog',
		key: 'myblog',
		maxAge: '2592000000'
	},
	mongodb: 'mongodb://localhost:27017/myblog',
	cors: "http://localhost:3000",
}