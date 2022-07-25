/*
 * @Author: Mr.Tian
 * @Date: 2021-12-29 11:00:19
 * @LastEditTime: 2021-12-30 09:11:51
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')

module.exports = async (req, res, next) => {

    let token = req.headers['authorization']

    token = token ? token.split('Bearer ')[1] : null

    if (!token) {
        return res.status(401).end()
    }

    try {
        const decodeToken = await jwt.verify(token, jwtSecret)
        req.user = await User.findById(decodeToken.userId)
        next()
    } catch (error) {
        return res.status(401).json({
            error
        })
        // return res.status(401).end()
    }

}