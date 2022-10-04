const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
// 去掉异步
const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const tplPath = path.join(__dirname, "../template/dir.dpl");
const mime = require("../helper/mime");
const compress = require("../helper/compress");
const range = require("../helper/range");
const isFresh = require("../helper/cache");
// const source = fs.readFileSync(tplPath, "utf-8");
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath, config) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      // 是文件
      res.setHeader("Content-Type", `${mime(filePath)};charset=utf-8`);
      let rs;

      console.log("isFresh(stats, req, res)", isFresh(stats, req, res));
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      const { code, start, end } = range(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, { start, end });
      }

      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res); // 创建一个读的流返回给浏览器
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");

      const dir = path.relative(config.root, filePath); // 获取相对路径

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
    res.end(`${filePath} is not a file or directory \n \n \n ${error}`);
  }
};
