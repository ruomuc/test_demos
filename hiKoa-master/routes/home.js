// routes/home.js
module.exports = {
    async index(ctx, next) {
        await ctx.render('index', {
            title: '首页',
            type:'home',
        })
    }
}