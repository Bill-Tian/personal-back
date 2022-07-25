/*
 * @Author: Mr.Tian
 * @Date: 2022-01-04 09:52:38
 * @LastEditTime: 2022-01-04 10:35:34
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const { Label } = require('../model')

// 获取标签
exports.getTags = async (req, res, next) => {
    try {
        const tags = await Label.find();
        res.status(200).json({
            tags
        })
    } catch (error) {
        next(error)
    }
}

// 新增标签
exports.createTag = async (req, res, next) => {
    try {
        const tags = new Label(req.body.tags);
        await tags.save()
        res.status(201).json({
            tags
        })
    } catch (error) {
        next(error)
    }
}

// 删除标签
exports.deleteTag = async (req, res, next) => {
    try {
        const tag = req.params
        const tags = await Label.deleteOne({ _id: tag.tagId })
        res.status(200).json({
            tags
        })
    } catch (error) {
        next(error)
    }
}