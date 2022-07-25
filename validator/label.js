/*
 * @Author: Mr.Tian
 * @Date: 2022-01-04 10:38:24
 * @LastEditTime: 2022-01-04 10:45:47
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const validate = require("../middleware/validate");
const { body } = require('express-validator');


exports.createTga = validate([
    body('tags.tagName').notEmpty().withMessage('标签不能为空'),
])