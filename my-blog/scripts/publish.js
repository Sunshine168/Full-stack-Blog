const fs = require('async-file')
const path = require('path')
if (process.argv.length < 3) {
	console.log("please input the publish root");
	return;
}
let serverPath = process.argv[2];
/*
判断传入的是绝对路径还是相对路径
*/
if (serverPath.substr(0, 1) != '/') {
	serverPath = path.resolve(__dirname, '../../', serverPath);
	console.log("resolve path:" + serverPath)
}
(async function() {
	try {
		//检查项目是否已经build,默认为build文件夹
		var result = await fs.exists(path.resolve(__dirname, '../', build));
		if (result) {
			//项目已经build

			//判断发布路径是否可达
			result = await fs.exists(serverPath);
			if (result) {
				//发布路径可达
				result = await fs.exists(serverPath + "/build");
				if (result) {
					//如果已经存在build文件夹
				} else {

				}
			} else {
				throw new Error("did not publish to this folder");
			}
		}
		eles {
			throw new Error("please build the project with yarn build or npm run build");
		}
	} catch (e) {
		console.log(e);
	}
	console.log(result);
})()