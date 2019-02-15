const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = {
    async signup(ctx, next) {
        if (ctx.method === 'GET') {
            await ctx.render('signup', {
                title: '用户注册',
                type: 'signup'
            })
            return
        }
        //生成salt
        var salt = await bcrypt.genSalt(10);
        let { name, email, password } = ctx.request.body;
        console.log('body:', name, email, password);
        // TODO 合法性校验
        //对密码进行加密
        password = await bcrypt.hash(password, salt);
        var user = {
            name,
            email,
            password,
        }
        var result = await UserModel.create(user);
        ctx.flash = { success: '注册成功' };
        ctx.redirect('/signin')
    },

    async signin(ctx, next) {
        if (ctx.method === 'GET') {
            await ctx.render('signin', {
                title: '用户登录',
                type: 'signin'
            })
            return;
        }
        var { name, password } = ctx.request.body
        console.log('info', name, password);
        var user = await UserModel.findOne({ name })
        if (user && await bcrypt.compare(password, user.password)) {
            ctx.session.user = {
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
                email: user.email
            }
            ctx.flash = { success: '登录成功' };
            ctx.redirect('/')
        } else {
            ctx.body = '用户名或密码错误'
        }
    },

    async signout(ctx, next) {
        ctx.session.user = null;
        ctx.flash = { warning: '退出登录' };
        ctx.redirect('/');
    }
}