const koa = require('koa');
const app = new koa();

app.use(ctx => {
  console.log(ctx)
  ctx.toJSON(JSON.stringify({a:1}))
});

app.listen(3000);

console.log(Object.keys(app));
