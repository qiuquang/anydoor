const fs = require("fs");
const path = require("path");
const config = require("../config/defaultConfig");
const Handlebars = require("handlebars");
// 去掉异步
const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const tplPath = path.join(__dirname, "../template/dir.dpl");
const mime = require("../helper/mime");
// const source = fs.readFileSync(tplPath, "utf-8");
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      // 是文件
      res.statusCode = 200;
      res.setHeader("Content-Type", mime(filePath));
      // readFile(filePath,(err,data)=>{ // 操作响应速度比较慢，会卡
      //   res.end(data)
      // })
      fs.createReadStream(filePath).pipe(res); // 创建一个读的流返回给浏览器
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");

      const dir = path.relative(config.root, filePath); // 获取相对路径
      console.log(dir);

      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : "",
        files: files.map((file) => {
          return {
            file,
            icon: mime(file),
          };
        }),
      };
      res.end(template(data));
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end(`${filePath} is not a file or directory`);
  }
};
