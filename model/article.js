/*
 * @Author: Mr.Tian
 * @Date: 2021-12-30 09:39:36
 * @LastEditTime: 2022-01-13 11:01:35
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const mongoose = require('mongoose')
const baseModel = require('./base-model')
const Schema = mongoose.Schema

const articleSchema = new mongoose.Schema({
    ...baseModel,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    tagList: {
        type: [String],
        default: null
    },
    favoritesCount: {
        type: Number,
        default: 0,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = articleSchema