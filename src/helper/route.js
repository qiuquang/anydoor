const fs = require("fs");
// 去掉异步
const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      // 是文件
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      // readFile(filePath,(err,data)=>{ // 操作响应速度比较慢，会卡
      //   res.end(data)
      // })
      createReadStream(filePath).pipe(res); // 创建一个读的流返回给浏览器
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(files.join(","));
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end(`${filePath} is not a file or directory`);
  }
};
