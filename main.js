let path = require('path');
let http = require('http');
let url = require('url');
let fs = require('fs');

let root = path.resolve(process.argv[2] || '.')

console.log('根目录是：',root)

var server = http.createServer(function(request,response){
    //获取用户访问url
    let pathname =  url.parse(request.url).pathname;
    
    //解析成本地文件路径
    let filepath = path.join(root,pathname);

    fs.stat(filepath,function(err,stats){
        // 文件存在
        if(!err && stats.isFile()){
            response.writeHead(200)
            fs.createReadStream(filepath).pipe(response)
        }

    })
})

server.listen(8080)
console.log('启动服务：http://127.0.0.1:8080/')

