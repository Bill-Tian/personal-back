/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 14:34:25
 * @LastEditTime: 2021-12-28 14:42:22
 * @LastEditors: Mr.Tian
 * @Description: 
 */

// 获取指定用户资料
exports.getUserInfo = async (req, res, next) => {
    try {
        // 处理请求
        res.send('post /profiles/:usernam')
    } catch (error) {
        next(error)
    }
}

// 关注用户
exports.followUser = async (req, res, next) => {
    try {
        // 处理请求
        res.send('post /profiles/:usernam/follow')
    } catch (error) {
        next(error)
    }
}