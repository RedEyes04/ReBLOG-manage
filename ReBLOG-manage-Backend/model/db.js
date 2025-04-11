const mysql = require('mysql')
const config = require('../config/default')

//数据库链接
const connection = mysql.createConnection({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
})

//直接链接
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

//链接指定数据库
const pool = mysql.createPool({
  connectionLimit: 10,  //链接数量
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DB
})

// 通过 pool.getConnection 获得链接
let query2 = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release();   // 释放该链接，把该链接放回池里供其他人使用
          // connection.destroy();   // 如果要关闭连接并将其从池中删除，请改用connection.destroy（）。该池将在下次需要时创建一个新的连接。
        })
      }
    })
  })
}

//数据库创建语句
let reblog = 'create database if not exists reblog default charset utf8 collate utf8_general_ci;'

//创建数据库
let createDatabase = (db) => {
  return query(db, [])
}


//数据表
let users =
  `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY ( id )
  );`

let subset =
  `create table if not exists subset(
    id INT NOT NULL AUTO_INCREMENT,
    subset_name VARCHAR(100) NOT NULL COMMENT '分类名称',
    classify INT NOT NULL COMMENT '类型0文章，1图片，2资源',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY ( id )
  );`

let file =
  `create table if not exists file(
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(100) NOT NULL COMMENT '地址',
    file_name VARCHAR(100) NOT NULL COMMENT '名称',
    format VARCHAR(32) NOT NULL COMMENT '格式',
    subset_id INT COMMENT '所属分类',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY ( id )
  );`

let article =
  `create table if not exists article(
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
    PRIMARY KEY ( id )
  );`

//文章点赞
let praise =
  `create table if not exists praise(
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(100) NOT NULL COMMENT '用户',
    article_id INT  NOT NULL COMMENT '所属文章',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY ( id )
  );`

let comment =
  `create table if not exists comment(
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(100) NOT NULL COMMENT '用户',
    user_name VARCHAR(100) COMMENT '用户名称',
    article_id INT  NOT NULL COMMENT '所属文章',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    content VARCHAR(1000) NOT NULL COMMENT '内容',
    complaint INT DEFAULT 0 COMMENT '举报次数',
    isread INT DEFAULT 0 COMMENT '是否已读',
    PRIMARY KEY ( id )
  );`

let label =
  `create table if not exists label(
    id INT NOT NULL AUTO_INCREMENT,
    label_name VARCHAR(100) NOT NULL COMMENT '名称',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY ( id )
  );`

let diary =
  `create table if not exists diary(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(200) NOT NULL COMMENT '标题',
   content VARCHAR(5000) NOT NULL COMMENT '内容',
   picture VARCHAR(500) COMMENT '图片地址',
   weather_id INT COMMENT '天气',
   mood INT DEFAULT 0 COMMENT '心情',
   moment VARCHAR(100) NOT NULL COMMENT '时间',
   PRIMARY KEY ( id )
  );`

let weather =
  `create table if not exists weather(
   id INT NOT NULL AUTO_INCREMENT,
   weather_name VARCHAR(32) NOT NULL COMMENT '名称',
   icon VARCHAR(100) COMMENT '图标',
   PRIMARY KEY ( id )
  );`

let message =
  `create table if not exists message(
   id INT NOT NULL AUTO_INCREMENT,
   user_id VARCHAR(100) NOT NULL COMMENT '用户',
   user_name VARCHAR(100) COMMENT '用户名称',
   moment VARCHAR(100) NOT NULL COMMENT '时间',
   content VARCHAR(1000) NOT NULL COMMENT '内容',
   isread INT DEFAULT 0 COMMENT '是否已读',
   PRIMARY KEY ( id )
  );`

let record =
  `create table if not exists record(
   id INT NOT NULL AUTO_INCREMENT,
   user_id VARCHAR(100) NOT NULL COMMENT '用户',
   position VARCHAR(100) COMMENT '位置',
   isread INT DEFAULT 0 COMMENT '设备',
   moment VARCHAR(100) NOT NULL COMMENT '时间',
   PRIMARY KEY ( id )
  );`

//创建数据表
const createTable = (sql) => {
  return query2(sql, [])
}

//先创建数据库再创建表
async function create() {
  await createDatabase(reblog);
  createTable(users);
  createTable(subset);
  createTable(file);
  createTable(article);
  createTable(praise);
  createTable(comment);
  createTable(label);
  createTable(diary);
  createTable(weather);
  createTable(message);
  createTable(record);
}

//开启连接数据库
connection.connect();

create();
exports.query2 = query2