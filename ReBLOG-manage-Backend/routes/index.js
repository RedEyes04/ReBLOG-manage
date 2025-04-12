const serve = require('../controller/serve')

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.send('你好')
  })
  //验证是否注册
  app.post('/isRegister', (req, res) => {
    serve.isRegister(req, res)
  })

  //管理员注册
  app.post('/register', (req, res) => {
    serve.insertUser(req, res)
  })

  //管理员登录
  app.post('/signin', (req, res) => {
    serve.signin(req, res)
  })
  //获取评论
  app.post('/comment', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.getComment(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //获取文章
  app.post('/aritcle', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.getArticle(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })
  //修改文章发布状态
  app.post('/changeAritcleState', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.changeAritcleState(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //文章删除
  app.post('/deleteAritcle', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.deleteAritcle(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //文章不同状态条数
  app.post('/articleState', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.articleState(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //查找分组exports.subset 
  app.post('/subset', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.subset(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //新建分组addSubset
  app.post('/addSubset', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.addSubset(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //修改分组名称updateSubset
  app.post('/updateSubset', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.updateSubset(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //删除分组deleteSubset
  app.post('/deleteSubset', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.deleteSubset(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //获取标签getLabel
  app.post('/label', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.getLabel(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //新建标签addLabel
  app.post('/addLabel', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.addLabel(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //删除标签deleteLabel
  app.post('/deleteLabel', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.deleteLabel(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //获取文件getFile
  app.post('/getFile', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.getFile(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //移动文件removeFile
  app.post('/removeFile', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.removeFile(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //获取日记
  app.post('/diary', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.getDiaryPage(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //删除日记deleteDiary
  app.post('/deleteDiary', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.deleteDiary(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //新建文章/图库
  app.post('/createArticle', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.createArticle(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //获取文章gainArticle
  app.post('/gainArticle', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.gainArticle(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //修改文章/图库updateArticle
  app.post('/updateArticle', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.updateArticle(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //新建日记createDiary
  app.post('/createDiary', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.createDiary(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //删除文件deleteFile
  app.post('/deleteFile', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.deleteFile(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })

  //获取数据总览overview
  app.post('/overview', (req, res) => {
    if (typeof (req.body.token) != 'undefined') {
      serve.overview(req, res)
    } else {
      res.send({
        code: 400
      })
    }
  })
}