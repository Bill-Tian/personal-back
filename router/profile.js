/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 14:26:23
 * @LastEditTime: 2021-12-28 14:43:06
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')
const profile = require('../controller/profile')

const router = express.Router()

// 获取指定用户资料
router.post('/:username', profile.getUserInfo)

// 关注用户
router.post('/:username/follow', profile.followUser)


module.exports = router