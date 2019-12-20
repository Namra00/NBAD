var Item = require('../models/Item');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/anime', {useNewUrlParser: true});
var Schema = mongoose.Schema;
// var itemData = mongoose.model('itemDb',itemSchema);
var itemSchema = new Schema({},{collection:'item'});

var itemModel = mongoose.model('item1',itemSchema);

module.exports.getItems = function () {
  return new Promise(resolve =>{
    resolve(itemModel.find().then(function(data){
      let items = [];
      for (let i = 0; i < data.length; i++) {
        myitem = JSON.parse(JSON.stringify(data[i]))
        let item = new Item(
          myitem.itemCode,
          myitem.itemName,
          myitem.catalogCategory,
          myitem.trivia,
          myitem.description,
          myitem.imgUrl,
          myitem.userId,
        );
          items.push(item);
        } // end of for
        return items;
    }))
  })
};

  module.exports.getItem = function(itemCode) {
    // return itemmodel.find({itemcode:itemID}).exec();
    return new Promise(resolve =>{
        resolve(itemModel.find({itemCode:parseInt(itemCode)}).then(function(data){
            // let item = new Item();
            // d[0].imageURL = item.getImageURL(d[0].itemCode);
            //console.log(data[0].itemName);
            myitem = JSON.parse(JSON.stringify(data[0]))
            let item = new Item(
              myitem.itemCode,
              myitem.itemName,
              myitem.catalogCategory,
              myitem.trivia,
              myitem.description,
              myitem.imgUrl,
              myitem.userId);

              console.log(item);

            return item;
      }));
    });

  };

  module.exports.categories = ["Action", "Adventure", "Comedy", "Fantasy","Martial Arts","Magic", "Sci-Fi", "Supernatural", "Thriller"];
