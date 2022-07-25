/*
 * @Author: Mr.Tian
 * @Date: 2021-12-30 09:20:40
 * @LastEditTime: 2022-01-13 10:07:16
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')
const articleCtrl = require('../controller/article')
const auth = require('../middleware/auth')
const atricleValidator = require('../validator/article')

const router = express.Router()

// 查询所有文章列表
router.get('/', articleCtrl.getArticle)

// 获取单篇文章
router.get('/:articleId', atricleValidator.getOneArticle, articleCtrl.getOneArticle)

// 创建文章
router.post('/createArticle', auth, atricleValidator.createArticle, articleCtrl.createArticle)

// 更新文章
router.put('/:articleId', auth, atricleValidator.updateArticle, articleCtrl.updateArticle)

// 删除文章
router.delete('/:articleId', auth, atricleValidator.deleteArticle, articleCtrl.deleteArticle)

// 模糊查询文章
router.post('/search', articleCtrl.searchArticle)

// 点赞文章
router.post('/:articleId/favorite', articleCtrl.favoriteArticle)

module.exports = router
