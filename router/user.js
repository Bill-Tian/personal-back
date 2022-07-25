/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 14:13:19
 * @LastEditTime: 2021-12-29 17:39:43
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

// 用户登录
router.post('/users/login', userValidator.login, userCtrl.login)

// 用户注册
router.post('/users', userValidator.resgister, userCtrl.resgister)   // 3.通过验证，执行具体的控制器处理

// 获取当前登录用户
router.get('/user', auth, userCtrl.getCurrentUser)

// 更新用户
router.put('/user', auth, userCtrl.updateCurrentUser)

// 查询所以用户
router.get('/allUser', userCtrl.getAllUser)

// 删除用户
router.delete('/deleteUser/:id', auth, userCtrl.deleteUser)

module.exports = router