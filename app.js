var express = require('express');
var session = require('express-session');
var userDB = require('./utility/userDB.js');

var app = express();

app.use(session({
  secret: 'Namra',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
const path = require('path');
let catalogController = require('./routes/catalogController');  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); //  routes defining
app.use('/', catalogController);
app.use('/index', catalogController);

app.use('/myitems', catalogController);

app.use('/categories',catalogController);
app.use('/categories/:categoryName',catalogController);
app.use('/item',catalogController); // app.use('/')
app.use('/contact', catalogController);
app.use('/about', catalogController);
app.use('/login', catalogController);

module.exports = app;







app.listen(8080);
