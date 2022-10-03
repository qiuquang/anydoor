const http = require("http");
const { join } = require("path");
const chalk = require("chalk");
const conf = require("./config/defaultConfig");
const route = require("./helper/route");

const server = http.createServer((req, res) => {
  const filePath = join(conf.root, req.url);
  route(req, res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});
