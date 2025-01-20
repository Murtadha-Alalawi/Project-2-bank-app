// =======================
// 1. IMPORTS
// =======================
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require("./middleware/is-signed-in.js")
const passUserToView = require('./middleware/pass-user-to-view.js')
const authController = require('./controllers/auth.js');
const bankController = require('./controllers/bank.js');


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
    res.redirect('/users/:userId/bank-accounts')
  }else{
    res.render('index.ejs')
  }
})
app.use('/auth', authController)
app.use(isSignedIn)
app.use(passUserToView)
app.use("/users/:userId/bank-accounts",bankController)










// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
