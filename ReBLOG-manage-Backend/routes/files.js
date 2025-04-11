const multer = require('multer');
const serve = require('../controller/serve')

//生成随机数Ï
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 设置存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/files'); // 保存文件的目录
  },
  filename: function (req, file, cb) {
    let name = '';

    //正则匹配后缀名
    const files = req.file.originalname.split('.')
    // let type = file.originalname.replace(/.+\./, ".")
    let type = '.' + files[1]
    name = Date().getTime() + random(1, 1000) + type

    cb(null, name); // 保存文件的名称，避免重名冲突
  }
});

// 创建 multer 实例
const upload = multer({ storage: storage });

module.exports = function (app) {

  app.post('/upload', upload.single('file'), (req, res) => {
    try {
      // 文件已经保存到了 `uploads/` 目录下，并且 `req.file` 包含了文件的信息
      // console.log(req.file);
      // res.send('文件上传成功！');
      const file = req.file.originalname.split('.')
      let data = {
        url: req.file.filename,
        fileName: file[0],
        format: file[1],
        moment: new Date(),
      }
      serve.uploadFile(data, res)
    } catch (err) {
      res.send({
        code: 400
      })
    }
  });
}