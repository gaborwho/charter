const Koa = require('koa');
const app = new Koa(); 
const socket = (require('koa-websocket'))(app);
const router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const EventEmitter = require('events');

const http = router();
const ws = router();

const myEmitter = new EventEmitter();

http.get('/', ctx => {
  ctx.status = 200;
  ctx.body = 'Hello!';
});

http.post('/input', ctx => {
  console.log(ctx.request.body);
  myEmitter.emit('event', ctx.request.body);
  ctx.status = 200;
});

ws.get('/socket', ctx => {
  myEmitter.on('event', string => {
    console.log('event received');
    console.log(string);
    ctx.websocket.send(JSON.stringify(string));
 });

  ctx.websocket.send('Hey!');
  ctx.websocket.on('message', (message) => {
      console.log(message);
  });

});

app.use(bodyParser());
app.use(http.routes());//.use(http.allowedMethods());
socket.ws.use(ws.routes()).use(ws.allowedMethods());


socket.listen(3000);


