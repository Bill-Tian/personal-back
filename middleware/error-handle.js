/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 14:45:01
 * @LastEditTime: 2021-12-28 14:51:21
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const util = require('util')

module.exports = () => {
    return (err, req, res, next) => {
        res.status(500).json({
            error: util.format(err)
        })
    }
}