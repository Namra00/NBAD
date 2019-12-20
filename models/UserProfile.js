var user = require('./User.js');
var userData = require('../utility/userDB.js');
var itemData = require('../utility/itemDB.js');
var userItem = require('./UserItem.js');

class UserProfile {

  constructor(userID, listOfItems = [] ) {
    this._userID = userID;
    this._listOfItems = listOfItems;
  }

  addItem(userid, item, watchedIt="Yes", rateIt= "0"){

    for (var i = 0; i < this._listOfItems.length; i++) {
      if (this._listOfItems[i].item.itemCode == item.itemCode) {
        return 101;
      }
    }
    // var item = itemData.getItem(itemCode);
    var newitem = new userItem(userid, item, watchedIt, rateIt );
    this._listOfItems.push(newitem);
    return 10101;
  }

  removeItem(itemCode){
      this._listOfItems = this._listOfItems.filter( x  =>
      parseInt(x.item.itemCode) != parseInt(itemCode)
    );
    // return this._listOfItems;
  }

  updateItem(uid, itemCode, watchedIt, rateIt){
    for (var i = 0; i < this._listOfItems.length; i++) {
      if (this._listOfItems[i].item.itemCode == itemCode) {
        // var item = itemData.getItem(itemCode);
        var newitem = new userItem(uid, this._listOfItems[i].item, watchedIt, rateIt);
        this._listOfItems[i] = newitem;
      }
    }
  }

  getItems(){
    // console.log("Returnig this ****")
    // console.log(this._listOfItems)
    // console.log("Returnig this **** end")
    return this._listOfItems;
  }

  emptyProfile(){
    this._listOfItems.splice(0,this._listOfItems.length);
  }

}

module.exports = UserProfile;
