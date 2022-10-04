# anydoor

全局安装supervisor

npm install supervisor -g  

使用supervisor启动app.js   
supervisor app.js

模板引擎 
handlebars

mime 文件类型

gzip 文件请求压缩
Content-Encoding: gzip\deflate
正则  /b(gzip)/b 字符匹配

range
range： bytes=[start]-[end],可省略start、end，就从头到尾，用“，”分割，可以请求多个

响应头（res）：
Accept-Ranges:bytes
Content-Range:bytes start-end/total

curl
curl http://127.0.0.1:9527/LICENSE
curl -I http://127.0.0.1:9527/LICENSE
curl -i http://127.0.0.1:9527/LICENSE
curl -r 0-10 -i http://127.0.0.1:9527/LICENSE