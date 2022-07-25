/*
 * @Author: Mr.Tian
 * @Date: 2022-01-04 14:42:44
 * @LastEditTime: 2022-01-04 14:48:00
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')
const fileCtrl = require('../controller/fileServe')
const auth = require('../middleware/auth')

const router = express.Router()

// 上传文件
router.post('/uploadFile', auth, fileCtrl.uploadFile)

module.exports = router