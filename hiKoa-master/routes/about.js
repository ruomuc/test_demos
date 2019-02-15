// routes/about.js
module.exports = {
    async index(ctx, next) {
        await ctx.render('about', {
            title: '首页',
            type:'home',
        })
    }
}