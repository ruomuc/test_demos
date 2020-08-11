import Koa from 'Koa';
import Router from 'koa-router';

const koa = new Koa();

const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'hello world!';
})
koa.use(router.routes());
koa.listen(3999);