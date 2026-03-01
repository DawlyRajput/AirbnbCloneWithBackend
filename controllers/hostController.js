const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);
  // res.sendFile(path.join(rootDir, 'views','add-home.html'));
  res.pagetitle('host/edit-home', {
    pagetitle: 'add home to airbnb',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });

}
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("home not found");
      return res.redirect('/host/host-home-list');
    }
    console.log("home found", home);
    res.pagetitle('host/edit-home', {
      pagetitle: 'Edit Home',
      editing: editing,
      home: home,
       isLoggedIn: req.isLoggedIn,
           user: req.session.user
    });
  });

}
exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.pagetitle("host/host-home-list", {
      registeredHomes: registeredHomes,
      pagetitle: "Host Homes List",
       isLoggedIn: req.isLoggedIn,
           user: req.session.user

    });
  });
};
exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { housename, price, location, rating, photoUrl } = req.body;

  // const home=new Home(req.body.housename,req.body.price, req.body.location, req.body.rating)

  const home = new Home({ housename, price, location, rating, photoUrl });

  home.save().then(() => {
    console.log("home saved successfully");
  });
  res.redirect('/host/host-home-list');
}

exports.postEditHome = (req, res, next) => {
  const { id, housename, price, location, rating, photoUrl } = req.body;

  Home.findById(id)
    .then((home) => {
      if (!home) {
        return res.redirect("/host/host-home-list");
      }

      home.housename = housename;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;

      return home.save();
    })
    .then(() => {
      console.log("UPDATE BODY:", req.body);
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Update error:", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByIdAndDelete(homeId)
    .then(() => {
      console.log("Home deleted");
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while deleting home", err);
    });
};
