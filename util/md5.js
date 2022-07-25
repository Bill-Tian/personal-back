/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 16:53:59
 * @LastEditTime: 2021-12-28 17:02:22
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const crypto = require('crypto')

module.exports = str => {
    return crypto.createHash('md5')
        .update('tian' + str)
        .digest('hex')
}