/*
 * @Author: Mr.Tian
 * @Date: 2022-01-24 14:51:05
 * @LastEditTime: 2022-01-28 16:59:18
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    musicId: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    lrc: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        default: '#46718b'
    },
})

module.exports = musicSchema