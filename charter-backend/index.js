const Koa = require('koa');
const app = new Koa(); 
const socket = (require('koa-websocket'))(app);
const router = require('koa-router');

const http = router();
const ws = router();

http.get('/', ctx => {
    ctx.status = 200;
    ctx.body = 'Hello!';
    
});

ws.get('/socket', ctx => {
	console.log('nem routolja');
    ctx.websocket.send('Hey!');
    ctx.websocket.on('message', (message) => {
        console.log(message);
    });	
});

app.use(http.routes()).use(http.allowedMethods());
socket.ws.use(ws.routes()).use(ws.allowedMethods());

socket.listen(3000);


