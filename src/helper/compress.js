const { createGzip, createDeflate } = require("zlib");

module.exports = (rs, req, res) => {
  console.log(req.headers);
  const acceptencoding = req.headers["accept-encoding"];
  console.log("acceptencoding", acceptencoding);
  // 单词边界
  if (!acceptencoding || !acceptencoding.match(/\b(gzip|deflate)\b/)) {
    return rs;
  } else if (acceptencoding.match(/\b(gzip)\b/)) {
    res.setHeader("Content-Encoding", "gzip");
    return rs.pipe(createGzip());
  } else if (acceptencoding.match(/\b(deflate)\b/)) {
    res.setHeader("Content-Encoding", "deflate");
    return rs.pipe(createDeflate());
  }
};
