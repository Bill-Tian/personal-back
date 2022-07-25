/*
 * @Author: Mr.Tian
 * @Date: 2021-12-28 11:50:05
 * @LastEditTime: 2021-12-28 15:16:38
 * @LastEditors: Mr.Tian
 * @Description: 
 */
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandle = require('./middleware/error-handle')
require('./model')

const app = express()
const port = 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())

// 挂载路由
app.use('/api', router)

// 挂载统一处理服务器错误的中间件
app.use(errorHandle())


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})