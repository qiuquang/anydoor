const http = require("http");
const chalk = require("chalk");
const conf = require("./config/defaultConfig");
const { join } = require("path");
const { stat, readFile, createReadStream, readdir } = require("fs");

const server = http.createServer((req, res) => {
  const filePath = join(conf.root, req.url);
  stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end(`${filePath} is not a file or directory`);
      return;
    }
    if (stats.isFile()) {
      // 是文件
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      // readFile(filePath,(err,data)=>{ // 操作响应速度比较慢，会卡
      //   res.end(data)
      // })
      createReadStream(filePath).pipe(res); // 创建一个读的流返回给浏览器
    } else if (stats.isDirectory()) {
      readdir(filePath, (err, files) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(files.join(","));
      });
    }
  });
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});
