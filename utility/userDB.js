var User = require('../models/User');
var UserItem = require("../models/UserItem");
var itemDB = require("../utility/itemDB")
var UserProfile = require('../models/UserProfile')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/anime',{useNewUrlParser: true},function(err) {
    if (err) throw err;
});

var Schema = mongoose.Schema;
var usersSchema = new Schema({},{collection:'user'});

var userSchema = new Schema({
  userId : Number,
  firstName: String,
  lastName: String,
  emailAddress: String,
  userName: String,
  password: String
},{collection:'user'});

var usersItemSchema = new Schema({
    userId : Number,
    Item: Object,
    rating:String,
    watchedIt:String
},{collection:'useritem'});

var userDataModel = mongoose.model('user',usersSchema);
var userItemModel = mongoose.model('useritem',usersItemSchema);

module.exports.getUser = function(id){
    return userDataModel.find({userId:id}).exec();
}

module.exports.getUserProfile = function(id){
    return userItemModel.find({userId:parseInt(id)}).exec();
}

module.exports.deleteItem = function(id,userId){
    return userItemModel.remove({'Item.itemCode':parseInt(id),userId:parseInt(userId)}).exec();
}

module.exports.updateItem = function(id, userId, rating, watchedIt){
    return userItemModel.findOneAndUpdate({'Item.itemCode':parseInt(id), userId:parseInt(userId)}, {rating:parseInt(rating), watchedIt:watchedIt}).exec();
}

module.exports.saveitem = function(object){
    console.log(object);
    it = object.item
    var newobject = new userItemModel({
      Item:{
        itemCode:it.itemCode,
        itemName:it.itemName,
        catalogCategory:it.catalogCategory,
        description:it.description,
        trivia:it.trivia,
        userId:it.userId,
        imgUrl:it.imageURL
      },
      userId:object.userId,
      rating:object.rating,
      watchedIt:object.watchedIt
  });
    console.log(newobject);
    return newobject.save();
}
module.exports.credential = function(username,password){
  console.log(username, password);
  return userDataModel.find({userName: username, password: password}).exec();
}

// module.exports.getUsers = function () {
//   let users = [];
//   for (let i = 0; i < userData.length; i++) {
//     let user = new User(userData[i].userID,
//       userData[i].firstName,
//       userData[i].lastName,
//       userData[i].emailAddress,
//       users.push(user));
//     }; // end of for
//     return users;
//     // return data;
//   };
//
//   module.exports.getUser = function (userID) {
//     // console.info("from DB, Item code :" + itemCode)
//     for (var i = 0; i < userData.length; i++) {         // var itemCode = data.itemCode;
//       // console.log("Data" + JSON.stringify(data[i].imgUrl));
//       if (parseInt(userData[i].userID) == userID) {
//         console.log("Inside if");
//         let user = new User(userData[i].userID,
//           userData[i].firstName,
//           userData[i].lastName,
//           userData[i].emailAddress,
//         )
//         console.log("User"+JSON.stringify(user));
//         return user;
//       }         // console.log("Data"+i);
//     }
//   };
//
//   module.exports.getUserProfile = function (userID) {
//     for (var i = 0; i < userProfile.length; i++) {
//       if (parseInt(userProfile[i].userID) == userID) {
//         console.log("Inside if");
//         let userpro = new UserProfile(userProfile[i].userID, userProfile[i].userItem)
//         // console.log("User"+JSON.stringify(useritem));
//         return userpro;
//       }         // console.log("Data"+i);
//     }
//   };
//
// var userData = [
//   {
//     userID: 1,
//     firstName: "Namra",
//     lastName: "Desai",
//     emailAddress: "ndesai24@uncc.edu",
//   }
// ];
//
// var userProfile = [
//   {
//     userID: 1,
//     userItem: [new UserItem(itemDB.getItem(1), "Yes", 3),new UserItem(itemDB.getItem(7), "No", 3) ]
//   }
// ];
