/*
 * @Author: Mr.Tian
 * @Date: 2021-12-30 09:31:51
 * @LastEditTime: 2022-01-04 16:45:15
 * @LastEditors: Mr.Tian
 * @Description: 
 */

const validate = require("../middleware/validate");
const { body, param } = require('express-validator');
const mongoose = require('mongoose')
const { Article } = require('../model')


exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('标题不能为空'),
    body('article.description').notEmpty().withMessage('描述不能为空'),
    body('article.imgName').notEmpty().withMessage('图片名称不能为空'),
    body('article.body').notEmpty().withMessage('内容不能为空')
])


// 校验查询文章id
exports.getOneArticle = validate([

    validate.isValidObjectId(['params'], 'articleId')

    // param('articleId').custom(async value => {
    //     if (!mongoose.isValidObjectId(value)) {
    //         return Promise.reject('文章ID类型错误');

    //         // 同步 失败
    //         // throw new Error('文章ID类型错误')
    //     }
    //     // 同步 成功
    //     // return true
    // })
])

// 校验更新文章的ID 是否有效的ID
exports.updateArticle = [
    validate([
        validate.isValidObjectId(['params'], 'articleId')
    ]),

    // 校验文章是否存在
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        req.article = article
        if (!article) {
            return res.status(404).json({
                error: '未找到文章ID'
            })
        }
        next()
    },
    async (req, res, next) => {
        if (req.user._id.toString() !== req.article.author.toString()) {
            return res.status(403).json({
                error: '没有权限更改'
            })
        }
        next()
    }
]

// 删除检验
exports.deleteArticle = exports.updateArticle