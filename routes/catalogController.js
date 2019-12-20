var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false});
var User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
// var itemDb = 10;
var userDB = require('../utility/userDB');
var userprofile = require('../models/userProfile');
var Item = require('../models/Item');

/* GET home page. */
//
router.use(function(req,res,next){
  if (req.session.name) {
    var new_userprofile = new userprofile(req.session.userProfile._userId);
    var array = req.session.userProfile._listOfItems;
    for (var i = 0; i < array.length; i++) {
      console.log(array[i])
      var item = array[i]._item;
      // console.log(mahitem.Item)
      var item = new Item(item._itemCode, item._itemName, item._catalogCategory, item._description, item._trivia, item._imgURL, item._userId);
      new_userprofile.addItem(req.session.uid, item, array[i]._watchedIt, array[i]._rateIt)
    }
    req.session.userProfile = new_userprofile;
  }
  next()
})

var login_middleware = function(req,res,next){
  console.log('hllo');
  console.log(req.session.userid);
  if (req.session.userid) {
    userDB.getUser(req.session.userid).then(
      function(data){
        console.log(data);
        data = JSON.parse(JSON.stringify(data[0]))
        req.session.name = data.firstName + ' ' +data.lastName;
        req.session.uid = data.userId;
        req.session.myUser = new User(data.userId, data.firstName, data.lastName, data.email, data.userName, data.password);
        console.log(req.session.myUser);
        userDB.getUserProfile(req.session.myUser._userId).then(
          function(data1){
            console.log(req.session.myUser._userId);
            console.log(data1);
            var new_userprofile = new userprofile(req.session.myUser._userId, []);
            for(var i=0;i<data1.length;i++){
              var mahitem = JSON.parse(JSON.stringify(data1[i]))
              var item = mahitem.Item;
              // console.log(mahitem.Item)
              var item = new Item(item.itemCode, item.itemName, item.catalogCategory, item.description, item.trivia, item.imgUrl, item.userId);
              dump = new_userprofile.addItem(mahitem.userId, item, mahitem.watchedIt, mahitem.rating)
            }
            req.session.userProfile = new_userprofile;
            next();
          }
        )
    }
  );
}
else{
  next();
}
}
var attachment = function(req, res, next){
  res.locals.datasession = req.session.name;
  res.locals.userProfile = req.session.userProfile;
  next();
}

router.use(attachment);

router.get('/', function(req, res) {
  res.render('index');
});
router.get('/index', function(req, res) {
  res.render('index');
});

router.get('/categories', function(req, res) {
  itemDb.getItems().then(function(data){
    // console.log(data);
    var categories = itemDb.categories;
    var db = {
      items : data,
      categories : categories
    }
  res.render('categories',{data: db});
  })
});

 router.get('/item', function (req,res) {
   // console.log(req.query);
   itemDb.getItem(req.query.itemCode).then(function(data){
     res.render('item',{data: data });
   });

 });

 router.get('/contact', function(req, res) {
   res.render('contact');
 });

 router.get('/about', function(req, res) {
   res.render('about');
 });

 router.get('/myitems',[login_middleware, attachment], function(req,res){
   console.log("signin called");
   // var useritem = userDB.getUserProfile(1);
   // console.log(useritem);
   // req.session.userProfile = new  UserProfile(useritem);
   // console.log(res.locals.userProfile);
   // console.log("before ----------------------------");
   // console.log(res.locals.userProfile.getItems());
   if(req.session.myUser){
     if(req.query.action && req.query.itemCode){
       if(req.query.action == 'delete'){
         // req.session.userProfile.removeItem(req.query.itemCode)
         userDB.deleteItem(req.query.itemCode, req.session.uid).then(
           function(){
             req.session.userProfile.removeItem(req.query.itemCode);
             res.render('myitems');
           }
         )
       }
       if(req.query.action == 'update'){
         // console.log("Doing update thingsdfa");
         rating = req.query.rating
         watchedIt = req.query.watchedIt
         if(rating>5)rating = 5;
         if(rating<0)rating = 0;
         if(watchedIt!='Yes' && watchedIt!='No'){
           watchedIt = 'Yes';
         }
         userDB.updateItem(req.query.itemCode, req.session.uid, rating, watchedIt).then(
           function(){
               req.session.userProfile.updateItem(req.query.uid,req.query.itemCode, watchedIt, rating)
               res.render('myitems')
             }
         )
       }
       if(req.query.action == 'save'){
         itemDb.getItem(req.query.itemCode).then(
           function(ITEM){
             doit = req.session.userProfile.addItem(req.session.uid, ITEM );
             console.log(doit+'Function return');
             if(doit==10101){
               ob = {
                 item: ITEM,
                 userId: req.session.uid,
                 rating: 0,
                 watchedIt: "Yes"
               }
               userDB.saveitem(ob).then(
                 function(){
                 res.render('myitems');
               }
               );
             }
             else{
               res.render('myitems');
             }
           }
         )
       }
     }
   else{
     res.render('myitems');
   }
 }else{
    var flag = 1;
    console.log('bbbbbbbbbbbbbbbbbb');
    console.log(flag);
     res.render('signin',{flag:flag, user: req.session.myUser});
   }
   // console.log("after ----------------------------");
   // console.log(res.locals.userProfile.getItems());
   // res.render('myitems');
 });

 router.get('/feedback', function(req, res) {
   console.log("***************************************************************************")
   if(req.query.itemCode){
     console.log("***** HERE")
     var my_items = req.session.userProfile.getItems();
     // console.log(my_items);

     var item_ = undefined
     for(var i = 0;i<my_items.length;i++){
       if(my_items[i].item.itemCode == req.query.itemCode){
         item_ = my_items[i];
       }
     }
     if(item_ != undefined){
       res.render('feedback',{item_:item_});
     }
     else{
       res.redirect('/myitems')
     }
   }
   else{
     res.redirect('/myitems')
   }
 });

 router.get('/signin',[login_middleware, attachment], function(req,res){
   if (req.session.userid) {
     res.redirect('/myitems');
   }else {
     var flag = 1;
     console.log('cccccccccccccc');
     console.log(flag);
     res.render('signin',{flag:flag,user: req.session.myUser});
   }
 });

 router.post('/signin',[login_middleware,attachment,urlencodedParser,check('UserName').not().isEmpty(),check('Password').not().isEmpty()], function(req,res){
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
    res.render('error',{errors: errors.array(),u:req.session.myUser});
    }else{
      console.log(req.body.UserName +" Namra "+ req.body.Password);
      userDB.credential(req.body.UserName, req.body.Password).then(
     function(user){
       console.log(user[0]);
       user = JSON.parse(JSON.stringify(user[0]))
       if (user === null) {
         var flag = 0;
         console.log('aaaaaaaaaaaaaaaaaaaaaaa');
         console.log(flag);
         res.render('signin',{flag:flag,user: req.session.myUser});
       }else{
         console.log(user);
         console.log(user.userId);
         req.session.userid = user.userId;
         console.log(req.session.userid);
         res.redirect('/myitems');
       }

     }
   )
  }
 });

[urlencodedParser,check('username').not().isEmpty(),check('psw').not().isEmpty()]

router.get('/signout',function(req, res){
  req.session.destroy();
  res.redirect('/');
});
 module.exports = router;
