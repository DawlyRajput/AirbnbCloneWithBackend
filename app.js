//external module
require("dotenv").config();
 const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);




// local module
const storeRouter = require("./routes/storeRouter");
const { hostrouter, registerHomes } = require("./routes/hostrouter");
const authRouter = require("./routes/authRouter");
const rootDir = require('./utils/path-utils');


//  const errorsController=require("./controllers/errors");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');
// const { register } = require('module');


const app = express();
// app.set('view engine','ejs');
// app.set('views', 'views');

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri:process.env.MONGODB_URI,
  collection:'session'
})


// app.use((req, res,next)=>{
//     console.log(req.url, req.method);
//     next();
// })

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;

    res.locals.user = req.session.user;
  next();
})

// cookit check middleware

// app.use((req,res, next)=>{
//   req.isLoggedIn=req.get("cookie")?req.get("cookie").split("=")[1] === "true":false;
//  next();
// })

app.use(storeRouter);

 app.use("/host",(req, res, next)=>{
     if(req.session.isLoggedIn){
        next();
     }else{
      res.redirect('/login');
     }
})
app.use(hostrouter);
app.use(authRouter);

app.use(express.static(path.join(rootDir, 'public')))
// adding 404
// app.use(errorsController.foundError)
app.use(errorsController.pageNotFound);



const PORT = 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  