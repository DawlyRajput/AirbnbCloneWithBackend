// const fs= require('fs');
// const path=require('path');
// const rootDir=require('../utils/path-utils');
//   const favouriteDataPath=path.join(rootDir,'data','favourite.json');
// let registeredHomes=[];

// module.exports = class Favourite{

//   static addToFavourite(homeId, callback){

//     Favourite.getFavourites((favourites)=>{
//     //    favourite.push(this);
//      if(favourites.includes(homeId)){
//       console.log("home is already marked favourites");
//      }else{
//      favourites.push(this);
//       fs.writeFile(favouriteDataPath, JSON.stringify
//         (favourites),callback)
//      }
//     });

//   }
  
//   static getFavourites(callback){
//       const fileContent= fs.readFile( favouriteDataPath,(err, data)=>{
//                 callback(!err ?JSON.parse(data):[]);
            
//             });
//   }
// };


// module.exports = class Favourite{
//   static addToFavourite(homeId, callback){

//     Favourite.getFavourites((favourites)=>{
//     //    favourite.push(this);
//      if(favourites.includes(homeId)){
//       callback("home is already marked favourites");
//      }else{
//      favourites.push(homeId);
//       fs.writeFile(favouriteDataPath, JSON.stringify
//         (favourites),callback)
//      }
//     });
//   }
//   static getFavourites(callback){
//     fs.readFile(favouriteDataPath,(err, data)=>{
//       callback(!err? JSON.parse(data):[]);
//     })
//   }
// }
const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Favourite', favouriteSchema);