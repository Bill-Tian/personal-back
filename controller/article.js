/*
 * @Author: Mr.Tian
 * @Date: 2021-12-30 09:25:19
 * @LastEditTime: 2022-01-13 11:38:52
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const { Article, User } = require('../model')


// 获取所有文章
exports.getArticle = async (req, res, next) => {
    try {
        const { pageSize = 10, pageIndex = 1, tag, author } = req.query

        const filter = {}
        if (tag) {
            filter.tagList = tag
        }
        if (author) {
            const user = await User.findOne({ username: author })
            filter.author = user ? user._id : null
        }
        const article = await Article.find(filter)
            .skip(Number.parseInt(pageSize * (pageIndex - 1)))    // 跳过多少条
            .limit(Number.parseInt(pageSize))    // 取多少条
            .sort({
                // -1 倒序  1 升序
                createdAt: -1
            })
            .populate('author')

        const articlesCount = await Article.countDocuments(filter)

        res.status(200).json({
            article,
            articlesCount
        })
    } catch (error) {
        next(error)
    }
}

// 创建文章
exports.createArticle = async (req, res, next) => {
    try {
        // 处理请求
        const article = new Article(req.body.article)
        article.author = req.user._id
        article.populate('author').execPopulate();
        await article.save()
        res.status(201).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 获取单篇文章
exports.getOneArticle = async (req, res, next) => {
    try {
        const articlOne = await Article.findById(req.params.articleId).populate('author')

        // 统计单篇文章的访问量
        const favorite = { viewCount: articlOne.viewCount + 1 }
        const article = await Article.findByIdAndUpdate(req.params.articleId, favorite).populate('author')

        if (!article) {
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 更新文章
exports.updateArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndUpdate(req.article._id, req.body.article)
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article
        const articles = await article.remove()
        res.status(200).json({
            articles
        })
    } catch (error) {
        next(error)
    }
}

// 模糊查询文章
exports.searchArticle = async (req, res, next) => {
    try {

        let regexp = new RegExp(req.query.word, 'i')

        Article.find({ $or: [{ title: { $regex: regexp } }, { body: { $regex: regexp } }] }, (err, doc) => {
            if (err) {
                console.log(err)
                res.send({
                    code: 400,
                    msg: "查询失败"
                })
            }
            if (doc) {
                res.send({
                    code: 200,
                    msg: "查询成功",
                    data: doc
                })
            }
        })

    } catch (error) {
        next(error)
    }
}


// 点赞文章
exports.favoriteArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId);
        const favoritesCount = article.favoritesCount + 1;
        const favorite = { favoritesCount }
        const articleLike = await Article.findByIdAndUpdate(req.params.articleId, favorite)
        res.status(200).json({
            articleLike
        })
    } catch (error) {
        next(error)
    }
}