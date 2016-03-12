var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('./models/userModel.js').User

mongoose.connect('mongodb://localhost:27017/notes');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

//首页
app.get('/', function(req, res) {
  res.render('index',{
    title:'首页'
  });
});

//注册
app.get('/reg', function(req, res) {
  res.render('register',{
    title:'注册',
    //user: req.session.user,
    page:'reg'
  });
});

app.post('/reg', function(req, res) {
  var username = req.body.username,
  password = req.body.password,
  reppassword = req.body.passwordRepeat;
  if(password != reppassword){            //两次密码不一致
    console.log('password not same');
    return res.redirect('/reg');
  }

  User.findOne({username:username}, function (err, user) {
    if (err){
      console.log(err);
      return res.redirect('/reg');
    }
    console.log(user);
    if (user){
      console.log('11');
      return res.redirect('/reg');
    }

    var passmd5 = crypto.createHash('md5').update(password).digest('hex');
    var newUser = new User({
      username: username,
      password: passmd5
    });

    newUser.save();
  });
  //保存用户名密码

  return res.redirect('/');
});

//登陆
app.get('/login', function(req, res) {
  res.render('login', {
    title:'登陆'
  });
});

app.post('/login', function(req, res){
  var username = req.body.username,
  password = req.body.password;

  //查询数据库检测密码
});

//退出
app.get('/quit', function(req, res) {
  return res.redirect('/login');
});

app.listen(3000, function(req, res) {
  console.log('app is running at port 3000');
});
