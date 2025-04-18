require('dotenv').config(); // 加载 .env 文件内容

const config = {
  port: 3000,
  database: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME
  }
};

module.exports = config;
