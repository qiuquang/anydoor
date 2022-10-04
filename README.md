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

缓存
协商缓存   修改时间、hash值

缓存header
1.Expires(绝对时间)，Cache-Control(相对时间)
2.If-Modified-Sice（req）/Last-Modified（res） // 上次修改时间
req里面包含第一个，请求时看上次修改时间之后是否还修改过，如果没有就还是原来的值，如果有就在res里面更新cache-control的值
3.If-None-Match/ETag
