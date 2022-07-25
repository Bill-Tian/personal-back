/*
 * @Author: Mr.Tian
 * @Date: 2022-01-04 10:11:43
 * @LastEditTime: 2022-01-04 10:14:23
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const mongoose = require('mongoose')
const baseModel = require('./base-model')

const labelSchema = new mongoose.Schema({
    ...baseModel,
    tagName: {
        type: String,
        required: true
    }
})

module.exports = labelSchema