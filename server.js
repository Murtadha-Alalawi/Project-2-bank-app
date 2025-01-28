// =======================
// 1. IMPORTS
// =======================
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose")
console.log('Dev Branch')
const authController = require('./controllers/auth')
const session = require('express-session');
const isSignedIn = require("./middleware/is-signed-in.js")
const passUserToView = require('./middleware/pass-user-to-view.js')
const bankController = require('./controllers/bankApp.js')
app.use(express.static("public"))







// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev")); 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passUserToView)

// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABSE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB LOAI")})




// =======================
// 4. ROUTES
// =======================
app.get('/', (req, res) => {
  if(req.session.user){
    res.redirect(`/users/${req.session.user._id}/bank-accounts`)
  }else{
    res.render('index.ejs')
  }
})

app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users/:userId/bank-accounts', bankController)










// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
