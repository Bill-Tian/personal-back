/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 16:37:00
 * @LastEditTime: 2021-12-30 16:20:07
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose')

// 并行处理
exports = module.exports = validations => { // 2.判断验证结果
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

exports.isValidObjectId = (location, fields) => {
    return buildCheckFunction(location)(fields).custom(async value => {
        if (!isValidObjectId(value)) {
            return Promise.reject('ID不是一个有效的 objectID')
        }
    })
}
