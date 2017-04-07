const Koa = require('koa');
const router = require("koa-router")();//路由中间件
const convert = require("koa-convert");//路由中间件
const process = require('child_process');
const bodyparser = require('koa-bodyparser')()
const json = require('koa-json');
const app = new Koa();
var token = 'sha1=21afd03........';

app.use(convert(json()));
app.use(convert(bodyparser));
var execShell = function (){process.execFile('../update.sh',null,null,
  function (error, stdout, stderr) {
        console.log(stderr)
	});
}

router.post('/hook', (ctx, next)=> {//根路由
    if(ctx.request.headers['x-hub-signature']){
        if(ctx.request.headers['x-hub-signature']==token){
            execShell();
            ctx.body = '{msg:"success"}';
        }else{
            ctx.body = '{msg:"error"}';
            ctx.status = 500;
        }
    }else{
        ctx.body = '{msg:"error"}';
        ctx.status = 500;
    }

});

app.use(convert(router.routes()));
app.listen(8088);

