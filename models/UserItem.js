class UserItem {
   constructor(userId, item, watchedIt, rateIt) {
     this._userId = userId;
     this._item = item;
     this._watchedIt = watchedIt;
     this._rateIt = rateIt;
   }

    get userId(){
        return this._userId;
    }
    set userId(value){
        this._userId = value;
    }
   get item() {
     return this._item;
   }
   set item(value) {
     this._item = value;
   }
   get watchedIt() {
     return this._watchedIt;
   }
   set watchedIt(value) {
     this._watchedIt = value;
   }
   get rateIt() {
     return this._rateIt;
   }
   set raetIt(value) {
     this._rateIt = value;
   }
 }

 module.exports = UserItem;
