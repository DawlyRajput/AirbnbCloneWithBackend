// const fs= require('fs');
// const path=require('path');
// const rootDir=require('../utils/path-utils');
//   const homeDataPath=path.join(rootDir,'data','homes.json');
// // let registeredHomes=[];

// module.exports = class Home{
//     constructor(housename, price, location, rating, photoUrl){
//         this.housename=housename;
//         this.price=price;
//         this.location= location;
//         this.rating=rating;
//         this.photoUrl=photoUrl;


//     }
//     save(){

//         Home.find((registeredHomes)=>{
//         if(this.id){
//            registeredHomes=  registeredHomes.map(home=>{
//             home.id=== this.id?this: home
//            })

//        }else{
//           this.id=Math.random().toString();
//             registeredHomes.push(this);
//        }

//         // const homeDataPath=path.join(rootDir,'data','homes.json');
//         fs.writeFile(homeDataPath, JSON.stringify(registeredHomes),error=>{
//             console.log("file writing conculded", error);
//         })
//         })

//     }

//     // static find(){
//     //      const filePath=path.join(rootDir,'data','homes.json');
//     //     const fileContent= fs.readFile(filePath,(err, data)=>{
//     //         console.log("file read", err, data);
//     //         if(err){
//     //           return registeredHomes= [];
//     //         }
//     //         return registeredHomes=JSON.parse(data);
//     //     });

//     //     return registeredHomes;


//     // }

//      static find(callback){
//          //const homeDataPath=path.join(rootDir,'data','homes.json');
//         const fileContent= fs.readFile(homeDataPath,(err, data)=>{
//             console.log("file read", err, data);
//             callback(!err ?JSON.parse(data):[]);

//         });
// }

// //to get the details of selected house;
//   static findById(homeId, callback) {
//     this.find(homes => {
//       const homeFound = homes.find(home => home.id === homeId);
//       callback(homeFound);
//     })
//   }
// }


const mongoose = require('mongoose');
const homeSchema = mongoose.Schema({
    housename: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    photoUrl: String,

});
module.exports = mongoose.model('Home', homeSchema);