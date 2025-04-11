const fs = require('fs');
const path = require('path');

const fsp = require('fs').promises;


//删除文件
exports.delFiles = function (url) {
  if (typeof url == 'string') {
    fs.unlink('data/files/' + url, (err) => {
      if (err) throw err;
    });
  } else {
    url.map(function (ver) {
      fs.unlink('data/files/' + ver, (err) => {
        if (err) throw err;
      });
    })
  }
}

exports.getDirectorySize = async function (directory) {
  let size = 0;

  async function calculateSize(dir) {
    for await (const d of await fsp.readdir(dir, { withFileTypes: true })) {
      const currentPath = path.join(dir, d.name);
      if (d.isDirectory()) {
        await calculateSize(currentPath);
      } else {
        size += (await fsp.stat(currentPath)).size;
      }
    }
  }

  await calculateSize(directory);
  return size;
}

