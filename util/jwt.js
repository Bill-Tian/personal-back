/*
 * @Author: Mr.Tian
 * @Date: 2021-12-29 10:22:06
 * @LastEditTime: 2021-12-29 10:29:01
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

// 生成 jwt
exports.sign = promisify(jwt.sign)

// 验证 jwt
exports.verify = promisify(jwt.verify)

// 解析 jwt
exports.decode = promisify(jwt.decode)
