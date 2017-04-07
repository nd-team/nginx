const Koa = require('koa');
const router = require("koa-router")();//路由中间件
const convert = require("koa-convert");//路由中间件
const process = require('child_process');
const app = new Koa();
const token = '123';

var execShell = function (){process.execFile('../update.sh',null,null,
  function (error, stdout, stderr) {
        console.log(stderr)
	});
}

router.get('/hook', (ctx, next)=> {//根路由
    if(ctx.request.query.token==token){
        execShell();
    	ctx.body = '{msg:"success"}';
	}else{
        ctx.throw(404);
    }
});

app.use(convert(router.routes()));
app.listen(8088);

