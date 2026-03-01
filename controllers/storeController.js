// const Favourite = require("../models/favourite");
// const Home = require("../models/home");



// exports.getIndex= (req, res,next)=>{
//     // console.log(req.url, req.method);
//     const registeredHomes=Home.find((registeredHomes)=>{
//        res.pagetitle('store/index',
//          {registeredHomes:registeredHomes, 
//             pagetitle:'index'
//         }
//     );
//     });



// }
// exports.getHomes= (req, res,next)=>{
//     // console.log(req.url, req.method);
//     const registeredHomes=Home.find((registeredHomes)=>{
//        res.render('store/home-list',
//          {registeredHomes:registeredHomes, 
//             pagetitle:'Homes-list'
//         }
//     );
//     });



// }
// exports.getBookings= (req, res,next)=>{
//     // console.log(req.url, req.method);
//     const registeredHomes=Home.find((registeredHomes)=>{
//        res.render('store/bookings',
//          {registeredHomes:registeredHomes, 
//             pagetitle:'airbnb Home'
//         }
//     );
//     });



// }
// exports.getFavouriteList= (req, res,next)=>{
//    Favourite.getFavourites(favourites=>{

//        Home.find((registeredHomes)=>{
//        const favouriteHomes=  registeredHomes.filter(home=>favourites.includes(home.id));
//        res.render('store/favourite-list',
//          {
//           favouriteHomes:favouriteHomes, 
//             pagetitle:' My favourite'
//         }
//     );
//     });
//    });
//     // console.log(req.url, req.method);




// }
// exports.postAddToFavourite=(req, res, next)=>{
//   console.log("came to add to favourites",req.body);
//  Favourite.addToFavourite(req.body.id, error=>{
//     if(error){
//       console.log("error while marking favourite",error);
//     }
//        res.redirect("/favourites");
//   })

// }


// // exports.getHomeDetails= (req, res,next)=>{
// //     const homeId=req.params.homeId;
// //     console.log("at detais home page", homeId);
// //       Home.findById(homeId,home=>{
// //         if(!home){
// //             console.log("home not found");
// //             res.redirect("/homes");
// //         }else{


// //         console.log("homes details found", homeId);
// //          res.render('store/home-detail', {
// //                 home: 'home',
// //                 pagetitle:'Homes-detail'

// //          });
// //         }
// //       })
// // };

// exports.getHomeDetails = (req, res, next) => {
//   const homeId = req.params.homeId;
//   console.log("T home details page ", homeId);
//   Home.findById(homeId, home => {
//     if (!home) {
//       console.log("Home not found");
//       res.redirect("/homes");
//     } else {
//       console.log("home details found", home);
//       res.render("store/home-detail", {
//         home: home,
//         pagetitle: "Home Detail",
//         // currentPage: "Home",
//       });
//     }
//   })
// };
// exports.registeredHomes=registeredHomes;

const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res) => {
  console.log("isloggedIn in getIndex", req.session);  
  Home.find().then(registeredHomes => {
    res.render("store/index", {
      registeredHomes,
      pagetitle: "Airbnb Home",
       isLoggedIn: req.isLoggedIn,
           user: req.session.user,
    });
  });
};

exports.getHomes = (req, res) => {
  Home.find().then(registeredHomes => {
    res.render("store/home-list", {
      registeredHomes,
      pagetitle: "Homes List",
       isLoggedIn: req.isLoggedIn,
           user: req.session.user,
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pagetitle: "My Bookings",
     isLoggedIn: req.isLoggedIn,
         user: req.session.user,

  });
};

exports.getFavouriteList = (req, res) => {
  Favourite.find()
    .populate("houseId")
    .then(favourites => {
      const favouriteHomes = favourites
        .map(fav => fav.houseId)
        .filter(home => home !== null); // 🔥 FIX

      res.render("store/favourite-list", {
        favouriteHomes,
        pagetitle: "My Favourites",
         isLoggedIn: req.isLoggedIn,
             user: req.session.user,
      });
    })
    .catch(err => console.log(err));
};

exports.postAddToFavourite = (req, res) => {
  const homeId = req.body.id;

  Favourite.findOne({ houseId: homeId }).then(existing => {
    if (!existing) {
      const fav = new Favourite({ houseId: homeId });
      return fav.save();
    }
  }).then(() => {
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavourite = (req, res) => {
  Favourite.findOneAndDelete({ houseId: req.params.homeId })
    .then(() => res.redirect("/favourites"));
};

exports.getHomeDetails = (req, res) => {
  Home.findById(req.params.homeId).then(home => {
    if (!home) return res.redirect("/homes");

    res.render("store/home-detail", {
      home,
      pagetitle: "Home Detail",
       isLoggedIn: req.isLoggedIn,
       user: req.session.user,
      
    });
  });
};
