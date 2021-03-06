require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./src/routes/user.route");
const articleRoutes = require('./src/routes/article.route');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//define root route
app.get('/',(req,res) => {
  res.status(200).send('WELCOME TO ARTICLE API！！！');
})

app.use('/api/v1/article', articleRoutes);
app.use("/api/v1/user", userRouter);

// //jientin
app.listen(process.env.APP_PORT, () => {
  console.log("server up and running on PORT :", process.env.APP_PORT);
});