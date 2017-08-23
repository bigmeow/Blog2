const webpack = require('webpack');
const path = require('path');
//源码目录
const srcPath = path.resolve(__dirname, 'src');



module.exports = {
    entry: {
        'common/main': [srcPath + '/common/main.js', 'webpack-hot-middleware/client?reload=true'] //4  指定重载策略，修改了前端代码js,css后，浏览器会自动刷新
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        publicPath: 'http://localhost:3000/public', //这里的地址要换成代理服务器的地址
    },
    devtool: 'eval-source-map', //2
    resolve:{
        //取别名，在自己的js里面直接使用这个别名
        alias: {
            SRC:srcPath ,
        }
    },
    module: {
        rules: [{
                test: /\.(png|jpg)$/,
                use: 'url-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap' //2
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            }


        ]
    },
    plugins: [
        //把jquery的全局变量提取出来的插件(jQuery not undefined)
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(), //根据模块的调用次数，给模块分配id，使得id可预测，降低文件大小 
        new webpack.HotModuleReplacementPlugin(), // 1.启用 HMR，模块热替换
        new webpack.NoEmitOnErrorsPlugin() //报错但不退出webpack的进程
    ]


};