
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login', 
        path: '/login',
        isLoggedIn: false,
        errors:[],
        user:{}
    });
}
exports.getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        errorMessage: [],
         isLoggedIn: false,
         oldInput: {}  ,
         user:{},
    });
};
exports.postSignUp = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should contain only alphabets"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*,.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  check("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),

  (req, res, next) => {
    const errors = validationResult(req);
const { firstName, lastName, email, password, userType } = req.body;


    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: false,
        errorMessage: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, userType },
        user:{},
      });
    }

    bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          firstName,
          lastName,
          email,      
          password: hashedPassword,
          userType
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch(err => {
        console.log("Error while saving user:", err.message);
        res.redirect("/signup");
      });

    
  }
];


exports.postLogin = async (req, res, next) => {
    // const username = req.body.username;
    // const password = req.body.password;      

    const { email, password } = req.body;
    const user= await User.findOne({email});
    if(!user){
      return res.status(422).render("auth/login",{
        pageTitle:"login",
        isLoggedIn:false,
        errors:["Invalid email or password"],
        oldInput:{email},
        user:{},
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        isLoggedIn: false,
        errors: ["Invalid email or password"],
        oldInput: { email },
        user:{}
      });
    }
    // req.isLoggedIn = true; 
     //or
     //res.cookie("isLoggedIn", true);

    req.session.isLoggedIn = true; // Set a session variable to indicate the user is logged in  
    // res.cookie("isLoggedIn", true);
    req.session.user = user; // Store the user object in the session for later use
     // Save the session to ensure it's stored before redirecting 
     await req.session.save();
  res.redirect('/');
}   


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};
