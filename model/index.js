/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 15:06:32
 * @LastEditTime: 2022-01-27 16:07:04
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const mongoose = require('mongoose');
const { dbUri } = require('../config/config.default')

// 连接MongoDB数据库
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => {
    console.log('数据库连接失败' + err);
});

db.once('open', function () {
    console.log('数据库连接成功');
});


// 组织导出模型类
module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article')),
    Label: mongoose.model('Label', require('./label')),
    Music: mongoose.model('Music', require('./music')),
}
