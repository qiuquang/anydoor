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


yargs
commander


## 安装
```
npm i -g anydoor
```

## 使用方法
```
anydoor # 把当前文件夹作为静态资源服务器的根目录

anydoor -p 8080 # 设置端口号为8080

anydoor -h localhost # 设置端口号为localhost

anydoor -d /usr # 设置根目录为/usr

```



本地构建
1.gulp 

\* 匹配任意个字符

？匹配一个字符

[...] 匹配范围内字符

!(pattern1|pattern2) 匹配取反

?(pattern1|pattern2) 匹配0个或1个

+(pattern1|pattern2) 匹配1个或多个

*(a|b|c) 匹配任意个

@(pattern|pat*|pat?erN) 匹配特定一个

** 任意层级匹配