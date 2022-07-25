/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 14:34:08
 * @LastEditTime: 2021-12-29 17:42:20
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// 用户登录
exports.login = async (req, res, next) => {
    try {
        // 处理请求

        // 生成token
        const user = req.user.toJSON()
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, { expiresIn: 60 * 60 * 2 })

        delete user.password
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}

// 用户注册
exports.resgister = async (req, res, next) => {
    try {
        // 处理请求
        let user = new User(req.body.user)
        await user.save()

        user = user.toJSON()
        delete user.password

        res.status(201).json({
            user
        })

    } catch (error) {
        next(error)
    }
}

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        // 处理请求
        const user = req.user
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

// 更新用户
exports.updateCurrentUser = async (req, res, next) => {
    try {
        // 处理请求
        const info = req.body.user
        const user = await User.findByIdAndUpdate(info._id, info)
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

// 查询所有用户
exports.getAllUser = async (req, res, next) => {
    try {
        // 处理请求
        const users = await User.find()
        res.status(200).json({
            users,
        })
    } catch (error) {
        next(error)
    }
}

// 删除用户
exports.deleteUser = async (req, res, next) => {
    try {
        // 处理请求
        const info = req.params

        const users = await User.deleteOne({ _id: info.id })

        res.status(200).json({
            users
        })
    } catch (error) {
        next(error)
    }
}