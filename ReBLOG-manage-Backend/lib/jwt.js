const jwt = require('jsonwebtoken');

const secret = 'rtfdgfdrewytcgd';

//生成token
exports.generateToken = function (e) {
  let paylond = { id: e, time: new Date() };
  let token = jwt.sign(paylond, secret, { expiresIn: 60 * 60 * 24 * 30 })
  return token;
}

//解码token
exports.verifyToken = function (e) {
  let payload;
  jwt.verify(e, secret, function (err, result) {
    if (err) {
      payload = 0;
    } else {
      payload = 1
    }
  })

  return payload;
}