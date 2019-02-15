const PostModel = require('../models/post');

module.exports = {
    async create(ctx,next){
        await ctx.render('create',{
            title:'新建',
        })
    },
    async show(ctx,next){
        await ctx.render('create',{
            title:'新建',
        })
    },
    async edit(ctx,next){
        await ctx.render('create',{
            title:'新建',
        })
    },
    async destroy(ctx,next){
        await ctx.render('create',{
            title:'新建',
        })
    },
}