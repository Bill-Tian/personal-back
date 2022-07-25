/*
 * @Author: Mr.Tian
 * @Date: 2022-01-26 15:57:30
 * @LastEditTime: 2022-01-28 11:22:09
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const request = require('../util/netease/request')
const { Music } = require('../model')


// 搜索音乐
exports.getOneMusic = async (req, res, next) => {
    try {
        //type 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        let data = {
            s: req.query.keywords,
            type: req.query.type || 1,
            limit: req.query.limit || 10,
            offset: req.query.offset || 0
        }
        console.log(data)
        let result = await request(
            'POST',
            `https://music.163.com/weapi/search/get`,
            data,
            { crypto: 'weapi', cookie: req.cookie, proxy: req.proxy }
        )
        res.send(result)
    } catch (e) {
        console.log(e)
        res.send({ status: 500 })
    }
}

// 获取热歌榜
exports.getHotsMusic = async (req, res, next) => {
    try {
        const topList = {
            0: '3779629',   // 云音乐新歌榜
            1: '3778678',   // 云音乐热歌榜
            2: '2884035',   // 云音乐原创榜
            3: '19723756',  // 云音乐飙升榜
            4: '10520166',  // 云音乐电音榜
            5: '180106',    // UK排行榜周榜
            6: '60198',     // 美国Billboard周榜
            7: '21845217',  // KTV嗨榜
            8: '11641012',  // iTunes榜
            9: '120001',    // Hit FM Top榜
            10: '60131',    // 日本Oricon周榜
        }
        let data = {
            id: topList[req.query.idx],
            n: 100
        }
        let result = await request(
            'POST',
            `https://music.163.com/weapi/v3/playlist/detail`,
            data,
            { crypto: 'linuxapi', cookie: req.query.cookie, proxy: req.query.proxy }
        )
        res.send(result)
    } catch (e) {
        res.send({ status: 500 })
    }
}


// 获取歌曲详情
exports.getMusicDetail = async (req, res, next) => {
    try {
        //type 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        let data = {
            s: req.query.keywords,
            type: req.query.type || 1,
            limit: req.query.limit || 10,
            offset: req.query.offset || 0
        }
        console.log(data)
        let result = await request(
            'POST',
            `https://music.163.com/weapi/v3/song/detail`,
            data,
            { crypto: 'weapi', cookie: req.cookie, proxy: req.proxy }
        )
        res.send(result)
    } catch (e) {
        res.send({ status: 500 })
    }
}


// 获取歌词
exports.getLyric = async (req, res, next) => {
    try {
        const data = {
            id: req.query.id,
            lv: -1,
            kv: -1,
            tv: -1,
        }
        let result = await request(
            'POST',
            `https://music.163.com/weapi/song/lyric`,
            data,
            { crypto: 'weapi', cookie: req.cookie, proxy: req.proxy }
        )
        res.send(result)
    } catch (e) {
        res.send({ status: 500 })
    }
}


// 添加音乐的歌曲库
exports.addMusic = async (req, res, next) => {
    try {
        // 先去根据id查询歌词
        const data = {
            id: req.body.music.musicId,
            lv: -1,
            kv: -1,
            tv: -1,
        }
        let result = await request(
            'POST',
            `https://music.163.com/weapi/song/lyric`,
            data,
            { crypto: 'weapi', cookie: req.cookie, proxy: req.proxy }
        )

        if (result.status != 200) {
            return res.status(500).json('未查到歌词')
        }


        const data2 = {
            c: '[{ "id":' + req.body.music.musicId + '}]',
        }
        console.log(data2);
        let result2 = await request(
            'POST',
            `https://music.163.com/weapi/v3/song/detail`,
            data2,
            { crypto: 'weapi', cookie: req.cookie, proxy: req.proxy }
        )

        if (result2.status != 200) {
            return res.status(500).json('未查到歌曲详情')
        }

        const cover = result2.body.songs[0].al.picUrl

        let picUrl = { cover }

        const lrc = result.body.lrc.lyric;

        let lyrics = { lrc }

        const musicData = Object.assign({}, req.body.music, lyrics, picUrl)

        const music = new Music(musicData);
        await music.save()
        res.status(201).json({
            music
        })

    } catch (e) {
        res.send({ status: 500 })
    }
}


// 查询音乐库
exports.getMusicList = async (req, res, next) => {
    try {
        const music = await Music.find();
        res.status(200).json({
            music
        })
    } catch (error) {
        next(error)
    }
}