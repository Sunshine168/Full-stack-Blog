const fs = require('async-file')
const path = require('path')
const execAsync = require('async-child-process').execAsync
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
}
(async function() {
	try {
		let buildPath = path.resolve(__dirname, '../', "build");
		console.log(`\x1b[34m build path :" ${buildPath}`)
		console.log(`\x1b[34m resolve path :" ${serverPath}`)
			//检查项目是否已经build,默认为build文件夹
		var result = await fs.exists(buildPath);
		if (result) {
			//项目已经build
			//判断发布路径是否可达
			result = await fs.exists(serverPath);
			if (result) {
				//发布路径可达
				var buildFolder = serverPath + "/build";
				result = await fs.exists(buildFolder);
				if (result) {
					//如果已经存在build文件夹,先清除旧目录再执行复制
					let cmd = `rm -rf ${buildFolder}`;
					let stdout = await execAsync(cmd);
					if (stdout.stderr.length != 0) {
						throw new Error("copy error")
					}
				}
				//如果不存在build文件夹 
				let cmd = `cp -r ${buildPath} ${serverPath}`;
				let stdout = await execAsync(cmd);
				if (stdout.stderr.length != 0) {
					throw new Error("copy error")
				}
			} else {

				throw new Error("did not publish to this folder");
			}
		} else {
			throw new Error("please build the project with yarn build or npm run build");
		}
	} catch (e) {
		console.log(`\x1b[31m ${e}`);
	}
})()