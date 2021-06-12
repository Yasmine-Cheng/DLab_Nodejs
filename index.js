const express=require("express");
const app=express();
const bodyParser= require('body-parser');
const port=3001;

app.use(bodyParser.json());

//GET method route
//single
app.get('/article', (req, res)=>{
    console.log(req.query.id);
    if(req.query.id==001){
        res.send("{article:'001',user:'yas',content:'one'}");//	傳送各種類型的回應。//取得文章列表的資料
    }
  });
//all
app.get('/articles',(req, res)=>{
    res.send("{article:'001',user:'yas',content:'one'},{article:'002',user:'hannah',content:'two'}");//	傳送各種類型的回應。//取得指定文章id的資料
  }); 
//POST method route
app.post('/article',(req, res)=>{
    console.log(req.body)
    res.json(req.body)//已新增article為例，用postman提交post請求（需有input），並讓api返回input的內容

  });
//jientin
app.listen(port, function() {
	console.log("伺服器已經啟動在 http://localhost:3001/articles");
}); 