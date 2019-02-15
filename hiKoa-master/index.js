// index.js
const Koa = require('koa')
const router = require('./routes')
const views = require('koa-views')
const serve = require('koa-static')
const mongoose = require('mongoose')
const session = require('koa-session')
const flash = require('koa-flash')
const bodyParser = require('koa-bodyparser')
const CONFIG = require('./config/config')
mongoose.connect(CONFIG.mongodb);
const app = new Koa()
app.use(bodyParser());
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.use(serve(__dirname + '/public'));

app.keys = ['qwerdf&*^%zm'];
app.use(session({
    key: CONFIG.session.key,
    maxAge: CONFIG.session.maxAge
}, app))
app.use(flash());
app.use(async (ctx, next) => {
    ctx.state.ctx = ctx
    await next()
})
router(app)

app.listen(CONFIG.port, () => {
    console.log('server is running at http://localhost:' + CONFIG.port);
})