const mysql = require('mysql')
const config = require('../config/default')

// 创建连接池
const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.database.HOST,
  port: config.database.PORT,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DB
})

// 使用连接池执行 SQL
let query2 = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          connection.release()
          if (err) reject(err)
          else resolve(rows)
        })
      }
    })
  })
}

// 用临时连接创建数据库（不依赖连接池）
let createDatabase = (sql) => {
  return new Promise((resolve, reject) => {
    const tmpConn = mysql.createConnection({
      host: config.database.HOST,
      port: config.database.PORT,
      user: config.database.USER,
      password: config.database.PASSWORD
    })
    tmpConn.query(sql, [], (err, result) => {
      tmpConn.end()
      if (err) reject(err)
      else resolve(result)
    })
  })
}

// 数据库创建语句
const reblog = `CREATE DATABASE IF NOT EXISTS reblog DEFAULT CHARSET utf8 COLLATE utf8_general_ci;`

// 表结构定义（以下均未改动）
const users = `CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '用户名',
  password VARCHAR(100) NOT NULL COMMENT '密码',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

const subset = `CREATE TABLE IF NOT EXISTS subset (
  id INT NOT NULL AUTO_INCREMENT,
  subset_name VARCHAR(100) NOT NULL COMMENT '分类名称',
  classify INT NOT NULL COMMENT '类型0文章，1图片，2资源',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

const file = `CREATE TABLE IF NOT EXISTS file (
  id INT NOT NULL AUTO_INCREMENT,
  url VARCHAR(100) NOT NULL COMMENT '地址',
  file_name VARCHAR(100) NOT NULL COMMENT '名称',
  format VARCHAR(32) NOT NULL COMMENT '格式',
  subset_id INT COMMENT '所属分类',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

const article = `CREATE TABLE IF NOT EXISTS article (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL COMMENT '标题',
  subset_id INT COMMENT '所属分类',
  classify INT NOT NULL COMMENT '类型0文章1图片',
  label VARCHAR(200) COMMENT '标签',
  introduce VARCHAR(1000) COMMENT '简介',
  content VARCHAR(5000) COMMENT '内容',
  cover VARCHAR(100) COMMENT '封面地址',
  views INT DEFAULT 0 COMMENT '查看次数',
  state INT DEFAULT 0 COMMENT '文章状态',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

const praise = `CREATE TABLE IF NOT EXISTS praise (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(100) NOT NULL COMMENT '用户',
  article_id INT NOT NULL COMMENT '所属文章',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

const comment = `CREATE TABLE IF NOT EXISTS comment (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(100) NOT NULL COMMENT '用户',
  user_name VARCHAR(100) COMMENT '用户名称',
  article_id INT NOT NULL COMMENT '所属文章',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  content VARCHAR(1000) NOT NULL COMMENT '内容',
  complaint INT DEFAULT 0 COMMENT '举报次数',
  isread INT DEFAULT 0 COMMENT '是否已读',
  PRIMARY KEY (id)
);`

const label = `CREATE TABLE IF NOT EXISTS label (
  id INT NOT NULL AUTO_INCREMENT,
  label_name VARCHAR(100) NOT NULL COMMENT '名称',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

const diary = `CREATE TABLE IF NOT EXISTS diary (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL COMMENT '标题',
  content VARCHAR(5000) NOT NULL COMMENT '内容',
  picture VARCHAR(500) COMMENT '图片地址',
  weather_id INT COMMENT '天气',
  mood INT DEFAULT 0 COMMENT '心情',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

const weather = `CREATE TABLE IF NOT EXISTS weather (
  id INT NOT NULL AUTO_INCREMENT,
  weather_name VARCHAR(32) NOT NULL COMMENT '名称',
  icon VARCHAR(100) COMMENT '图标',
  PRIMARY KEY (id)
);`

const message = `CREATE TABLE IF NOT EXISTS message (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(100) NOT NULL COMMENT '用户',
  user_name VARCHAR(100) COMMENT '用户名称',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  content VARCHAR(1000) NOT NULL COMMENT '内容',
  isread INT DEFAULT 0 COMMENT '是否已读',
  PRIMARY KEY (id)
);`

const record = `CREATE TABLE IF NOT EXISTS record (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(100) NOT NULL COMMENT '用户',
  position VARCHAR(100) COMMENT '位置',
  isread INT DEFAULT 0 COMMENT '设备',
  moment VARCHAR(100) NOT NULL COMMENT '时间',
  PRIMARY KEY (id)
);`

// 执行建表
const createTable = (sql) => query2(sql, [])

// 执行创建流程
async function create() {
  await createDatabase(reblog)
  await createTable(users)
  await createTable(subset)
  await createTable(file)
  await createTable(article)
  await createTable(praise)
  await createTable(comment)
  await createTable(label)
  await createTable(diary)
  await createTable(weather)
  await createTable(message)
  await createTable(record)
}

// 执行初始化
create()

// 导出 query2 方法（不动）
exports.query2 = query2
