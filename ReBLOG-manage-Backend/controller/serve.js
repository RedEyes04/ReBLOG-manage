const dbModel = require('../model/db_model')
const jwt = require('../lib/jwt')
const mkdir = require('../lib/mkdir')

//是否注册
exports.isRegister = async (req, res) => {

  await dbModel.isRegister().then((result) => {
    let code = 401
    if (result[0].count > 0) {
      //已注册
      code = 200
    }

    res.send({
      code: code,
    })

  })
}

//管理员注册
exports.insertUser = async (req, res) => {
  let data = req.body;
  // console.log('ok')

  // console.log(data)
  // res.send({
  //   code: 200,
  // })

  await dbModel.insertUser(data).then(() => {
    res.send({
      code: 200,
    })
  })
}

//管理员登录
exports.signin = async (req, res) => {
  let data = req.body;
  // console.log(data)

  await dbModel.signin(data.name).then((result) => {
    if (result.length > 0 && data.psw == result[0].password) {
      let token = jwt.generateToken(data.name)
      let message = {

        id: result[0].id,
        name: data.name,
        token: token
      }
      res.send({
        code: 200,
        data: message,
      })
    } else {
      res.send({
        code: 400,

      })
    }
  })
}

//获取评论
exports.getComment = async (req, res) => {
  let data = req.body;
  let count = -1;

  await dbModel.getCommentPage(data.pageSize, data.nowPage).then(async (result) => {
    if (data.count) {
      let c = await dbModel.commentCount(-1);
      count = c[0].count;
    }
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        // 获取对应的文章
        let getArticTitle = await dbModel.getArticleTitle(result[i].article_id);

        if (getArticTitle.length > 0) {
          result[i].article = {
            id: result[i].article_id,
            title: getArticTitle[0].title
          };
        } else {
          result[i].article = {
            id: -1
          };
        }
      }
    }
    res.send({
      code: 200,
      data: {
        count,
        result
      }
    });
  });
};
//将评论转化为已读
exports.commentIsread = async (req, res) => {
  let data = req.body;
  // console.log(data.id)
  await dbModel.commentIsread(data.id).then(async (result) => {
    res.send({
      code: 200
    })
  })
}
//删除评论deleteComment
exports.deleteComment = async (req, res) => {
  let data = req.body;

  await dbModel.deleteComment(data.id).then(async (result) => {
    res.send({
      code: 200
    })
  })
}




//获取私信
exports.getMessage = async (req, res) => {
  let data = req.body;
  let count = -1;

  await dbModel.getMessagePage(data.pageSize, data.nowPage).then(async (result) => {
    if (data.count) {
      let c = await dbModel.messageCount(1)
      count = c[0].count;
    }
    if (result.length > 0) {
      //将私信变为已读
      for (let i = 0; i < result.length; i++) {
        await dbModel.messageIsread(result[i].id)
      }
    }
    res.send({
      code: 200,
      data: {
        count,
        result
      }
    })
  })
}

//获取私信未读数

exports.noreadMessage = async (req, res) => {
  await dbModel.messageCount(0).then(async (result) => {
    res.send({
      code: 200,
      data: result[0].count
    })
  })
}
exports.deleteMessage = async (req, res) => {
  let data = req.body;
  try {
    const result = await dbModel.deleteMessage(data.id);
    const count = Array.isArray(result) && result[0] ? result[0].count : 0;
    res.send({
      code: 200,
      data: count
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      msg: '删除失败',
      error: error.message
    });
  }
}

//获取文章
exports.getArticle = async (req, res) => {
  let data = req.body;
  let count = -1;

  await dbModel.getArticlePage(data.pageSize, data.nowPage, data.state, data.subsetId, data.serchTerm, data.classify).then(async (result) => {
    if (data.count) {
      let c = await dbModel.articleCount(data.state, data.subsetId, data.serchTerm, data.classify)
      count = c[0].count;
    }
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let praise = await dbModel.praiseCount(result[i].id, -1);//点赞数
        let comment = await dbModel.commentCount(result[i].id)
        result[i].praise = praise[0].count;
        result[i].comment = comment[0].count;
        if (result[i].label) {
          result[i].label = result[i].label.split(",")
        }
      }
    }
    res.send({
      code: 200,
      data: {
        count,
        result
      }
    })
  })
}

//修改文章发布状态
exports.changeAritcleState = async (req, res) => {
  let data = req.body;

  await dbModel.changeAritcleState(data.articleId, data.state).then(() => {
    res.send({
      code: 200,
    })
  })
}

//文章删除
exports.deleteAritcle = async (req, res) => {
  let data = req.body;

  await dbModel.deleteAritcle(data.articleId).then(() => {
    res.send({
      code: 200,
    })
  })
}

//文章不同状态条数
exports.articleState = async (req, res) => {

  let unpublish = await dbModel.articleCount(0, -1, "", 0)
  let publish = await dbModel.articleCount(1, -1, "", 0)
  let message = [
    {
      name: '未发布',
      id: 0,
      value: unpublish[0].count,
    }, {
      id: 1,
      name: '已发布',
      value: publish[0].count,
    }
  ]
  res.send({
    code: 200,
    data: message,
  })
}

//获取分组
exports.subset = async (req, res) => {
  let data = req.body

  await dbModel.getSubset(data.classify).then(async (result) => {
    if (data.classify == 0 || data.classify == 1) {
      let count = await dbModel.articleCount(-1, -1, "", data.classify);
      let list = []
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          let value = await dbModel.articleCount(-1, result[i].id, "", data.classify);
          list[i] = {
            id: result[i].id,
            value: value[0].count,
            name: result[i].subset_name,
          }
        }
      }
      res.send({
        code: 200,
        data: { count: count[0].count, list }
      })
    } else if (data.classify == 2) {
      let count = await dbModel.fileCount(-1);
      let list = []
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          let value = await dbModel.fileCount(result[i].id);
          list[i] = {
            id: result[i].id,
            value: value[0].count,
            name: result[i].subset_name,
          }
        }
      }
      res.send({
        code: 200,
        data: { count: count[0].count, list }
      })
    }
  })
}

//新建分组
exports.addSubset = async (req, res) => {
  let data = req.body;
  // console.log(data.value)

  await dbModel.addSubset(data.value).then((result) => {
    res.send({
      code: 200,
      data: result.insertId
    })
  })
}

//修改分组名称updateSubset
exports.updateSubset = async (req, res) => {
  let data = req.body;

  await dbModel.updateSubset(data.subsetID, data.subsetName).then(() => {
    res.send({
      code: 200,
    })
  })
}

//删除分组deleteSubset
exports.deleteSubset = async (req, res) => {
  let data = req.body;

  await dbModel.deleteSubset(data.subsetID).then(() => {
    res.send({
      code: 200,
    })
  })
}

//获取标签
exports.getLabel = async (req, res) => {

  await dbModel.getLabel().then((result) => {
    res.send({
      code: 200,
      data: result
    })
  })
}

//新建标签addLabel
exports.addLabel = async (req, res) => {
  let data = req.body;

  await dbModel.addLabel(data.value).then((result) => {
    res.send({
      code: 200,
      data: result.insertId
    })
  })
}

//删除标签deleteLabel
exports.deleteLabel = async (req, res) => {
  let data = req.body;

  await dbModel.deleteLabel(data.labelId).then(() => {
    res.send({
      code: 200,
    })
  })
}

//获取文件
exports.getFile = async (req, res) => {
  let data = req.body;
  let count = -1;

  await dbModel.getFilePage(data.pageSize, data.nowPage, data.subsetId).then(async (result) => {
    if (data.count) {
      let c = await dbModel.fileCount(data.subsetId)
      count = c[0].count;
    }
    res.send({
      code: 200,
      data: {
        count,
        result
      }
    })
  })
}

//文件上传uploadFile

//删除文件deleteFile

//移动文件removeFile
exports.removeFile = async (req, res) => {
  let data = req.body;

  await dbModel.removeFile(data.fileId, data.subsetId).then(() => {
    res.send({
      code: 200,
    })
  })
}

//获取日记
exports.getDiaryPage = async (req, res) => {
  let data = req.body;
  let count = -1;

  await dbModel.getDiaryPage(data.pageSize, data.nowPage, data.serchTerm).then(async (result) => {
    if (data.count) {
      let c = await dbModel.diaryCount(data.serchTerm)
      count = c[0].count;
    }

    res.send({
      code: 200,
      data: {
        count,
        list: result
      }
    })
  })
}

//删除日记deleteDiary
exports.deleteDiary = async (req, res) => {
  let data = req.body;
  await dbModel.deleteDiary(data.diaryId).then(() => {
    res.send({
      code: 200,
    })
  })
}

//新建文章/图库
exports.createArticle = async (req, res) => {
  let data = req.body.value;
  if (data.label) {
    data.label = data.label.join(',')
  }

  await dbModel.createArticle(data).then(() => {
    res.send({
      code: 200,
    })
  })

}

exports.gainArticle = async (req, res) => {
  const articleId = req.body.articleId;
  if (!articleId) {
    return res.send({
      code: 400,
      msg: '缺少 articleId'
    });
  }

  const result = await dbModel.gainArticle(articleId);
  res.send({
    code: 200,
    data: result[0]
  });
};


//修改文章/图库updateArticle
exports.updateArticle = async (req, res) => {
  let data = req.body;
  await dbModel.updateArticle(data.id, data.value).then((result) => {
    res.send({
      code: 200,
    })
  })
}

//新建日记createDiary
exports.createDiary = async (req, res) => {
  let data = req.body;
  await dbModel.createDiary(data.value).then(() => {
    res.send({
      code: 200,
    })
  })
}

//新建文件uploadFile
exports.uploadFile = async (data, res) => {
  await dbModel.uploadFile(data).then((result) => {
    let value = {
      ...data,
      ...{ id: result.insertId }
    }
    res.send({
      code: 200,
      data: value
    })
  })
}

//删除文件deleteFile
exports.deleteFile = async (req, res) => {
  let data = req.body;
  await dbModel.deleteFile(data.filesId).then(async () => {
    //处理真实的文件删除
    mkdir.delFiles(data.filesUrl)
    res.send({
      code: 200,
    })
  })
}

//获取数据总览overview
exports.overview = async (req, res) => {
  let article = await dbModel.articleCount(-1, -1, "", 0)
  let gallery = await dbModel.articleCount(-1, -1, "", 1)
  let diary = await dbModel.diaryCount('')
  let file = await mkdir.getDirectorySize('data/files')
  // console.log(file)
  let room = 0;
  if (file < 1024 * 1024) {
    room = Math.round(file / 1024 * 100) / 100 + ' KB'
  } else {
    room = Math.round(file / 1024 / 1024 * 100) / 100 + ' MB'
  }
  let data = {
    article: article[0].count,
    gallery: gallery[0].count,
    diary: diary[0].count,
    file: room
  }
  res.send({
    code: 200,
    data: data,
  })
}




