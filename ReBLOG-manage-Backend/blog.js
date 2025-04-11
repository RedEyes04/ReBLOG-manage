
const express = require('express')
const app = express()
const config = require('./config/default')
const jwt = require('./lib/jwt')

//加入静态文件
app.use(express.static(__dirname + '/data'))

//设置跨域
app.all('*', function (req, res, next) {
  //允许访问ip *为所有
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  //这段仅仅为了方便返回json而已
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    //让options请求快速返回
    res.sendStatus(200);
  } else {
    next();
  }
});


//解析前端数据
app.use(express.json())//解析位 request.body

//token处理
app.use(async (req, res, next) => {
  if (typeof (req.body.token) != 'undefined') {
    let token = req.body.token;
    let isok = jwt.verifyToken(token);
    if (isok == 1) {
      next();
    } else {
      //验证未通过
      res.send({
        code: 300
      })
    }
  } else {
    next();
  }

})

//引入路由
require('./routes/index')(app);
require('./routes/files')(app);

app.listen(config.port, () => {
  console.log(`已启动端口${config.port}`)
})