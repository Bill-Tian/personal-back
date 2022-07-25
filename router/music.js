/*
 * @Author: Mr.Tian
 * @Date: 2022-01-26 15:55:39
 * @LastEditTime: 2022-01-28 10:31:05
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')
const musicCtrl = require('../controller/music')

const router = express.Router()

// 搜索音乐
router.get('/search', musicCtrl.getOneMusic)

// 获取热歌榜
router.get('/hots', musicCtrl.getHotsMusic)

// 获取歌曲详情
router.post('/detail', musicCtrl.getMusicDetail)

// 获取歌词
router.get('/lyric', musicCtrl.getLyric)

// 添加音乐
router.post('/addMusic', musicCtrl.addMusic)

// 查询音乐list
router.get('/', musicCtrl.getMusicList)

module.exports = router