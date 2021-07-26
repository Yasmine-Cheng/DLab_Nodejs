// require("dotenv").config();
// const express=require("express");
// const app = express();
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./src/routes/user.route");
const articleRoutes = require('./src/routes/article.route');
// const port = process.env.PORT || 3001;
app.use(express.json());

// const userRouter = require("./src/routes/user.route");



// //define root route
// app.get('/',(req,res) => {
//   res.status(200).send('WELCOME TO ARTICLE API！！！');
// })


// app.use('/api/v1/user', userRouter);


// //jientin
// app.listen(process.env.APP_PORT, function() {
// 	console.log("伺服器已經啟動在PORT: ",process.env.APP_PORT);
// }); 


app.use('/api/v1/article', articleRoutes);
app.use("/api/v1/user", userRouter);
app.listen(process.env.APP_PORT, () => {
  console.log("server up and running on PORT :", process.env.APP_PORT);
});