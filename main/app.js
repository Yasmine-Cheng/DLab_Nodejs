const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
    //createServer接了兩個變數req&res
    //創建服務對象
    console.log('method: ',req.method) //get
    //列出現在的method是甚麼
    const url = req.url
    console.log('url: ',url)
    //列出現在的url


        // if (url.indexOf('article')>=0){
        //     //找文章
        //     var art = querystring.parse(url.split('/')[1])
        // }
        // else if (url.indexOf('user')>=0){
        //     //找用戶
        //     var us = querystring.parse(url.split('user')[1])
        // }
        // else if (url.indexOf('content')>=0){
        //     //找文章內容
        //     var con = querystring.parse(url.split('content')[1])
        // }

    if(req.method=='GET'){
        if(url=='article?id=001'){
            //找文章
            req.query={article:'001',user:'yas',content:'one'}
            console.log('query->',req.query)
            res.end(JSON.stringify(req.query))//結束回應程序。
        }
        else if(url=='/articles'){
            req.query=[{article:'001',user:'yas',content:'one'},{article:'002',user:'hannah',content:'two'}]
            console.log('query->',req.query)
            res.end(JSON.stringify(req.query))
        }
    } 
    else if(req.method=='POST'){
        if(url=='/article'){
            let post ="";
            req.on('data',body=>{
                post+=body;
            })
            req.on('end',()=>{
                res.end(post)
            })
        }
    }    
    // req.query = querystring.parse(url)
    //到底有那些參數，用?來split
    //不需要?及?前面的東西
    //querystring給他正確的結構可以解析
    console.log('query: ',JSON.stringify(art,us,con))
    res.end(
        JSON.stringify(art,us,con)
        //返還這筆資料
        )
});
server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    }); 