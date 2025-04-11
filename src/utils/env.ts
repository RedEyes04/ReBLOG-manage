let baseUrl = "";
let baseImgPath = "";

const nodeEnv = process.env.NODE_ENV ?? 'production'; // 如果没设置，默认为 production

if (nodeEnv === 'development') {
  // 开发环境
  baseUrl = 'http://127.0.0.1:3000';
  baseImgPath = 'http://localhost:3000/files';
} else {
  // 正式环境
  baseUrl = 'https://47.100.137.193:3000';
  baseImgPath = 'https://47.100.137.193:300/files';
}

export {
  baseUrl,
  baseImgPath
};
