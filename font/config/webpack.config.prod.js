/**
  加载常用模块及Webpack需要的模块组件
**/
//加载Node的Path模块
const path = require('path');
//加载Node的fs模块
const fs = require('fs');
//Node遍历文件插件
const glob = require('glob');
//加载webpack模块
const webpack = require('webpack');
//加载自动化css独立加载插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//加载自动化HTML自动化编译插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//加载JS模块压缩编译插件
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//加载公用组件插件
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

/**
  设置默认常用路径
**/
//srcDir为当前开发目录(默认:/src)
const srcDir = path.resolve(process.cwd(), 'src');
//assetsDir为当前建立目录(默认:/assets)
const assetsDir = path.resolve(process.cwd(), 'assets');
//读取入口的js文件目录(本目录只能对应页面的入口的JS,其他脚本需要写在/dist/plugins中)
const jsEntryDir = path.resolve(srcDir, 'dist/js');
//生成JS的目录地址(默认:)
const jsDir = 'dist/js/';
//生成css的目录地址(默认:)
const cssDir = 'dist/css/';

/**
  设置默认模块依赖及是否合并打包等设置
**/
//设置需要排除单独打包的插件
const singleModule = ['react', 'react-dom', 'jquery', 'Raphael'];
//是否合并打包其他组件模块
const libMerge = true;
//需要全局使用的组件,比如jquery,lodash等
const globalValue = {
    $: 'jquery'
};
//设置不需要使用的css目录
const excludeCss = ['dist/css/common', 'dist/css/components'];


//加载webpack目录参数配置
let config = {
    //开启source_map,可选择删除
    // devtool: 'source-map',
    //自动获取并生成入口,获取的目录路径为./src/dist/js,可以自行修改
    entry: getEntry(),
    //输出位置为./assests
    output: {
        path: path.join(process.cwd(), 'assets'),
        filename: jsDir + '[name].js',
        publicPath: '/'
    },
    plugins: [
        //排除css压缩加载在页面
        new ExtractTextPlugin(cssDir + '[name].css'),
        //合并额外的js包(暂时无用)
        // new CommonsChunkPlugin('lib', './dist/js/lib.js', jsExtract),
        //开启热加载模式
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //设置全局使用的变量
        new webpack.ProvidePlugin(globalValue),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        //加载器配置
        loaders: [
            //css加载器 排除不需要加css-modules的css部分
            {
                test: /\.css$/,
                exclude: getExcludeCss(),
                loaders: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&importLoaders=1',
                    'postcss-loader?sourceMap=true'
                ]
            },
            //css加载器 设置需要加ss-modules的css部分
            {
                test: /\.css$/,
                include: getExcludeCss(),
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap&importLoaders=1',
                    'postcss-loader?sourceMap=true'
                ]
            }, {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/, // 匹配不希望处理文件的路径
                include: path.join(process.cwd(), 'src')
            }, {
                test: /\.(png|jpeg|jpg|gif)$/,
                loader: 'file?name=dist/img/[name].[ext]'
            }, {
                test: /\.(woff|eot|ttf)$/i,
                loader: 'url?limit=10000&name=dist/fonts/[name].[ext]'
            }, {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: function(webpack) {
        return {
            plugins: [
                require('postcss-import')({
                    addDependencyTo: webpack
                }),
                require('postcss-display-inline-block'),
                require('autoprefixer'),
                require('precss'),
                require('postcss-easysprites')({
                    imagePath: '../img',
                    spritePath: './assets/dist/img'
                })
            ]
        };
    }
};
//设置排出的css路径
function getExcludeCss() {
    var cssArr = [];
    excludeCss.forEach(function(paths) {
        cssArr.push(path.resolve(srcDir, paths));
    });
    return cssArr;
}
//设置入口文件
function getEntry() {
    var entrys = glob.sync(path.resolve(jsEntryDir, '**/*.js'));
    var map = {};
    entrys.forEach(function(entry) {
        if (entry) {
            var path = entry.replace(jsEntryDir + '/', '');
            var entryName = path.substring(0, path.length - 3);
            map[entryName] = entry;
        }
    });
    //自定义额外加载包,不会合并在页面对应js中
    if (libMerge) {
        map['lib'] = singleModule;
    } else {
        singleModule.forEach(function(libName) {
            map[libName] = [libName];
        });
    }
    return map;
}

var files = glob.sync(path.resolve(srcDir, '**/*.html'));
files.forEach(function(filename) {
    var m = filename.match(/(.+)\.html$/);
    if (m) {
        var conf = {
            template: filename,
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            filename: filename.replace(srcDir, assetsDir)
        };
        var vendor = m[1].replace(srcDir + '/', '');
        if (vendor in config.entry) {
            if (libMerge) {
                conf.chunks = ['lib', vendor];
            } else {
                conf.chunks = [vendor].concat(singleModule);
            }

        }
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
});

module.exports = config;
