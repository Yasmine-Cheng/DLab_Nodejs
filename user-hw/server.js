const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
// bcrypt => 將一個字串做雜湊加密
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const port = process.env.PORT || 3003;
  
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
// Passport 可以想成是一個處理驗證的 middleware，
// 提供超過上百組驗證策略(Strategy)。
// 可以依照自己的需求，
// 使用帳號和密碼或第三方認證系統
  
const users = []
  
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))

// https://stackoverflow.com/questions/49987007/error-secret-option-required-for-sessions-espress-session
app.use(session({ secret: 'somevalue' }));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
  
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})
  
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})
  
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
  
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})
  
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // 10加倍雜湊次數
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})
  
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
  
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  
  res.redirect('/login')
}
  
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
  

app.listen(port, function() {
	console.log("伺服器已經啟動在 http://localhost:3003/");
}); 