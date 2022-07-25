/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 16:40:25
 * @LastEditTime: 2021-12-28 17:52:12
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const { body } = require('express-validator');
const validate = require('../middleware/validate')
const { User } = require('../model')
const md5 = require('../util/md5')

exports.resgister = validate([ // 1.配置验证规则
    body('user.username')
        .notEmpty().withMessage('用户名不能为空')
        .bail()
        .custom(async value => {
            const user = await User.findOne({ username: value })
            if (user) {
                return Promise.reject('用户已存在')
            }
        }),

    body('user.password')
        .notEmpty().withMessage('密码不能为空'),

    body('user.email')
        .notEmpty().withMessage('邮箱不能为空')
        .isEmail().withMessage('邮箱格式不正确')
        .bail()
        .custom(async value => {
            const user = await User.findOne({ email: value })
            if (user) {
                return Promise.reject('邮箱已存在')
            }
        })
])


exports.login = [
    validate([
        body('user.username').notEmpty().withMessage('用户名不能为空'),
        body('user.password').notEmpty().withMessage('密码不能为空')
    ]),
    validate([
        body('user.username')
            .custom(async (value, { req }) => {
                const user = await User.findOne({ username: value })
                    .select(['username', 'email', 'bio', 'image', 'password'])
                if (!user) {
                    return Promise.reject('用户不存在')
                }
                // 将数据挂载到请求对象中，后续中间件可以使用
                req.user = user
            }),
    ]),
    validate([
        body('user.password')
            .custom(async (value, { req }) => {
                console.log(req.user);
                if (md5(value) !== req.user.password) {
                    return Promise.reject('密码错误')
                }
            }),
    ])
]