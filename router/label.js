/*
 * @Author: Mr.Tian
 * @Date: 2022-01-04 09:32:28
 * @LastEditTime: 2022-01-04 10:43:39
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')
const labelCtrl = require('../controller/label')
const auth = require('../middleware/auth')
const labelValidator = require('../validator/label')

const router = express.Router()


// 获取标签
router.get('/', labelCtrl.getTags)

// 新增标签
router.post('/createTag', auth, labelValidator.createTga, labelCtrl.createTag)

// 删除标签
router.delete('/:tagId', auth, labelCtrl.deleteTag)

module.exports = router