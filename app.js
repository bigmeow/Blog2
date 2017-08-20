
const express=require('express');
//引入模板
const swig=require('swig');
const app=express();

//3.在这里调用webpack的配置
const webpack =require('webpack');
const webpackConfig=require('./webpack.config.js');
const compiler= webpack(webpackConfig); 

app.use(require('webpack-dev-middleware')(compiler,{
    noInfo:true,
    stats:{
        colors:true
    },
    publicPath:webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


//配置静态资源目录(可配置多个)  配置了上面的中间件，这行代码在开发时可以注释掉了
//因为上面的热加载把编译后的文件放内存了，不放public的文件磁盘上了
// app.use('/public',express.static(__dirname+'/public'));

//模板配置--------------------------------
app.engine('html',swig.renderFile);
app.set('views','./server/views');
app.set('view engine','html');
swig.setDefaults({
    cache:false
});
//模板配置end-------------------------------


app.get('/',(req,res,next)=>{
    res.render('index');
});
//引入路由
app.use('/',require('./server/routers/api'));

/*
app.listen(8080,()=>{
    console.log('web应用启动成功');
});
*/
//实现服务器重启以后浏览器能自动刷新
const reload= require('reload');
const http =require('http');
const server=http.createServer(app);
reload(app);//通知浏览器刷新
server.listen(8080,()=>{
    console.log('web应用启动成功3');
});


