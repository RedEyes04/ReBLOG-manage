const db = require('./db')

//查询数据库是否有注册用户
exports.isRegister = () => {
  let _sql = `select count(*) as count from users;`
  return db.query2(_sql)
}

//管理员注册
exports.insertUser = (value) => {
  let _sql = "insert into users set ?;"
  return db.query2(_sql, value)
}

//管理员登录
exports.signin = (name) => {
  let _sql = `select * from users where name="${name}";`
  return db.query2(_sql)
}

//获取评论
exports.getCommentPage = (pageSize, nowPage) => {
  let _sql = `select * from comment order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  return db.query2(_sql)
}
//删除评论deleteComment
exports.deleteComment = (id) => {
  let _sql = `delete from comment where id="${id}";`
  return db.query2(_sql)
}
//查询评论总数
exports.commentCount = (id) => {
  let _sql;
  if (id == -1) {
    _sql = `select count(*) as count from comment;`
  } else {
    _sql = `select count(*) as count from comment where article_id="${id}";`
  }
  return db.query2(_sql)
}
//删除私信deleteMessage
exports.deleteMessage = (id) => {
  let _sql = `delete from message where id="${id}";`
  return db.query2(_sql)
}



//评论变为已读
exports.commentIsread = (id) => {
  let _sql = `update comment set isread=1 where id="${id}";`
  return db.query2(_sql)
}

//获取文章名称
exports.getArticleTitle = (id) => {
  let _sql = `select title from article where id="${id}";`
  return db.query2(_sql)
}

//获取私信
exports.getMessagePage = (pageSize, nowPage) => {
  let _sql = `select * from message order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  return db.query2(_sql)
}

//查询私信总数
exports.messageCount = (isread) => {

  let _sql;
  if (isread == 0) {
    _sql = `select count(*) as count from message where isread=0;`

  } else {
    _sql = `select count(*) as count from message;`

  }
  return db.query2(_sql)
}

//私信变为已读
exports.messageIsread = (id) => {
  let _sql = `update message set isread=1 where id="${id}";`
  return db.query2(_sql)
}

//获取文章
exports.getArticlePage = (pageSize, nowPage, state, subsetId, serchTerm, classify) => {
  let _sql;
  if (serchTerm) {
    _sql = `select * from article where concat(title,introduce) like "%${serchTerm}%" and classify="${classify}" order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  } else if (subsetId > -1 && typeof subsetId == 'number') {
    _sql = `select * from article where subset_id="${subsetId}" and classify="${classify}" order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  } else if (typeof subsetId == 'string') {
    _sql = `select * from article where subset_id not in ("${subsetId}") and classify="${classify}" order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  } else if (state > -1) {
    _sql = `select * from article where state="${state}" and classify=0  order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  } else {
    _sql = `select * from article where classify="${classify}" order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  }
  return db.query2(_sql)
}

//查询文章总数
exports.articleCount = (state, subsetId, serchTerm, classify) => {
  let _sql;
  if (serchTerm) {
    _sql = `select count(*) as count from article where concat(title,introduce) like "%${serchTerm}%" and classify="${classify}";`
  } else if (subsetId > -1 && typeof subsetId == 'number') {
    _sql = `select count(*) as count from article where subset_id="${subsetId}" and classify="${classify}";`
  } else if (typeof subsetId == 'string') {
    _sql = `select count(*) as count from article where subset_id not in ("${subsetId}") and classify="${classify}";`
  } else if (state > -1) {
    _sql = `select count(*) as count from article where state="${state}" and classify=0;`
  } else {
    _sql = `select count(*) as count from article where classify="${classify}";`
  }
  return db.query2(_sql)
}

//修改文章发布状态
exports.changeAritcleState = (id, state) => {
  let _sql = `update article set state="${state}" where id="${id}";`
  return db.query2(_sql)
}

//文章删除
exports.deleteAritcle = (id) => {
  let _sql = `delete from article where id="${id}";`
  return db.query2(_sql)
}

//新建文章点赞
exports.addPraise = (value) => {
  let _sql = "insert into praise set ?;"
  return db.query2(_sql, value)
}

//判断文章点赞数
exports.praiseCount = (id, userId) => {
  let _sql;
  if (userId == -1) {
    _sql = `select count(*) as count from praise where article_id="${id}";`
  } else {
    _sql = `select count(*) as count from praise where article_id="${id}" and user_id="${userId}";`
  }
  return db.query2(_sql)
}

//新建分组
exports.addSubset = (value) => {
  let _sql = "insert into subset set ?;"
  return db.query2(_sql, value)
}

//获取分组
exports.getSubset = (classify) => {
  let _sql = `select * from subset where classify="${classify}";`
  return db.query2(_sql)
}

//获取文件总数
exports.fileCount = (subsetId) => {
  let _sql;
  if (subsetId > -1 && typeof subsetId == 'number') {
    _sql = `select count(*) as count from file where subset_id="${subsetId}";`
  } else if (typeof subsetId == 'string') {
    _sql = `select count(*) as count from file where subset_id not in ("${subsetId}");`
  } else {
    _sql = `select count(*) as count from file;`
  }
  return db.query2(_sql)
}

//修改分组名称updateSubset
exports.updateSubset = (id, name) => {
  let _sql = `update subset set subset_name="${name}" where id="${id}";`
  return db.query2(_sql)
}

//删除分组deleteSubset
exports.deleteSubset = (id) => {
  let _sql = `delete from subset where id="${id}";`
  return db.query2(_sql)
}

//获取标签
exports.getLabel = () => {
  let _sql = `select * from label order by id desc;`
  return db.query2(_sql)
}

//新建标签addLabel
exports.addLabel = (value) => {
  let _sql = "insert into label set ?;"
  return db.query2(_sql, value)
}

//删除标签deleteLabel
exports.deleteLabel = (id) => {
  let _sql = `delete from label where id="${id}";`
  return db.query2(_sql)
}

//获取文件
exports.getFilePage = (pageSize, nowPage, subsetId) => {
  let _sql;
  if (subsetId > -1 && typeof subsetId == 'number') {
    _sql = `select * from file where subset_id="${subsetId}" order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  } else if (typeof subsetId == 'string') {
    _sql = `select * from file where subset_id not in ("${subsetId}") order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  } else {
    _sql = `select * from file order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  }
  return db.query2(_sql)
}

//查询文件总数
exports.fileCount = (subsetId) => {
  let _sql;
  if (subsetId > -1 && typeof subsetId == 'number') {
    _sql = `select count(*) as count from file where subset_id="${subsetId}";`
  } else if (typeof subsetId == 'string') {
    _sql = `select count(*) as count from file where subset_id not in ("${subsetId}");`
  } else {
    _sql = `select count(*) as count from file;`
  }
  return db.query2(_sql)
}

//移动文件removeFile
exports.removeFile = (id, subsetId) => {
  let _sql = `update file set subset_id="${subsetId}" where id="${id}";`
  return db.query2(_sql)
}

//获取日记
exports.getDiaryPage = (pageSize, nowPage, serchTerm,) => {
  let _sql;
  if (serchTerm) {
    _sql = `select * from diary where concat(title,content) like "%${serchTerm}%" order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  } else {
    _sql = `select * from diary order by id desc limit ${(nowPage - 1) * pageSize},${pageSize};`
  }
  return db.query2(_sql)
}

//查询文章总数
exports.diaryCount = (serchTerm) => {
  let _sql;
  if (serchTerm) {
    _sql = `select count(*) as count from diary where concat(title,content) like "%${serchTerm}%";`
  } else {
    _sql = `select count(*) as count from diary;`
  }
  return db.query2(_sql)
}

//删除日记deleteDiary
exports.deleteDiary = (id) => {
  let _sql = `delete from diary where id="${id}";`
  return db.query2(_sql)
}

//新建文章/图库
exports.createArticle = (value) => {
  let _sql = "insert into article set ?;"
  return db.query2(_sql, value)
}

//获取文章/图库gainArticle
exports.gainArticle = (id) => {
  let _sql = `select * from article where id="${id}";`
  return db.query2(_sql)
}

//修改文章/图库updateArticle
exports.updateArticle = (id, value) => {
  let _sql = `update article set ? where id="${id}";`
  return db.query2(_sql, value)
}

//新建日记createDiary
exports.createDiary = (value) => {
  let _sql = "insert into diary set ?;"
  return db.query2(_sql, value)
}

//新建文件uploadFile
exports.uploadFile = (value) => {
  let _sql = "insert into file set ?;"
  return db.query2(_sql, value)
}

//删除文件deleteFile
exports.deleteFile = (id) => {
  let _sql
  if (typeof id == 'number') {
    _sql = `delete from file where id="${id}";`
  } else {
    //批量删除
    _sql = `delete from file where id in ("${id}");`
  }

  return db.query2(_sql)
}


// //添加评论数据
// let addCommentTodatabases = () =>{
//   let time = new Date();
//   let _sql =`INSERT INTO comment(user_id,user_name,article_id,moment,content,complaint) VALUES('114515','REDEYES6','1','${time}','希望就在我们各自的心中，看啊，道路就在我们的脚下，所以我们要奔跑于今天，一路奔跑，直到永恒',6)`
//   db.query2(_sql)

// }
// addCommentTodatabases();




// let addMessageTodatabases = () =>{
//   let time = new Date();
//   let _sql =`INSERT INTO message(user_id,user_name,moment,content) VALUES('114515','REDEYES04','${time}','希望就在我们各自的心中，看啊，道路就在我们的脚下，所以我们要奔跑于今天，一路奔跑，直到永恒')`
//   db.query2(_sql)

// }
// addMessageTodatabases();



// let message =
//   `create table if not exists message(
//    id INT NOT NULL AUTO_INCREMENT,
//    user_id VARCHAR(100) NOT NULL COMMENT '用户',
//    user_name VARCHAR(100) COMMENT '用户名称',
//    moment VARCHAR(100) NOT NULL COMMENT '时间',
//    content VARCHAR(1000) NOT NULL COMMENT '内容',
//    isread INT DEFAULT 0 COMMENT '是否已读',
//    PRIMARY KEY ( id )
//   );`