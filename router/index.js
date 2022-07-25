/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 14:04:28
 * @LastEditTime: 2022-01-04 14:42:29
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')

const router = express.Router()

// 用户相关配置
router.use(require('./user'))

// 用户资料相关路由
router.use('/profiles', require('./profile'))

// 文章相关配置
router.use('/article', require('./article'))

// 标签相关配置
router.use('/label', require('./label'))

// 音乐相关配置
router.use('/music', require('./music'))


// 文件相关配置
router.use('/fileServe', require('./fileServe'))


module.exports = router