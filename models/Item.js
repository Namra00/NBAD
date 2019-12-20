class Item {
   constructor(itemCode, itemName, catalogCategory,  trivia, description, imageURL, userid) {
     this._itemCode = itemCode;
     this._itemName = itemName;
     this._catalogCategory = catalogCategory;
     this._description = description;
     this._trivia = trivia;
     this._imageURL = imageURL;
     this._userId = userid;
   }
   get itemCode() {
     return this._itemCode;
   }
   set itemCode(value) {
     this._itemCode = value;
   }
   get itemName() {
     return this._itemName;
   }
   set itemName(value) {
     this._itemName = value;
   }
   get catalogCategory() {
     return this._catalogCategory;
   }
   set catalogCategory(value) {
     this._catalogCategory = value;
   }
   get description() {
     return this._description;
   }
   set description(value) {
     this._description = value;
   }
   get trivia() {
     return this._trivia
   }
   set trivia(value) {
     this._trivia = value;
   }

   // get rating() {
   //   return this._rating;
   // }
   // set rating(value) {
   //   this._rating = value;
   // }
   getImageURL(){
     return this._imageURL;
   }
   // getImageURL(itemCode){
   //   return '/assets/images' + itemCode + '.jpg';
   // }
 }

 module.exports = Item;
