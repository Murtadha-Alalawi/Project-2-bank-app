const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user')

router.get('/sign-up', (req,res)=>{
    res.render('auth/sign-up.ejs')
});

router.get('/sign-in', (req,res)=>{
    res.render('auth/sign-in.ejs')
})

router.get('/sign-out', (req,res)=>{
    req.session.destroy();
    res.redirect('/')
});

router.post('/sign-up', async (req,res)=>{
    try {
        const userInDatabase = await User.findOne({email: req.body.email})
        if(userInDatabase){
            return res.send('Username has already been taken')
        }

        if(req.body.password !== req.body.confirmPassword){
            return res.send("Password and Confirm password must match")
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        const {firstName, lastName, email, password, confirmPassword, address, cardType} = req.body

        const newApplication = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            address,
            cardType
        }
        req.body.applications = newApplication

        await User.create(req.body);

        res.redirect('/auth/sign-in')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.post('/sign-in', async (req,res)=>{
    try {
        
        const userInDatabase = await User.findOne({email: req.body.email})
        if(!userInDatabase){
            res.send('npt signed up')
            return
        }


        console.log(userInDatabase)
        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );

        if(!validPassword){
            return res.send('Wrong password')
        };

        req.session.user = {
            username: userInDatabase.email,
            _id: userInDatabase._id
        };

        res.redirect(`/users/${req.session.user._id}/bank-accounts`);

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.post('/sign-out', (req,res)=>{
   if(req.session.user){
    req.session.destroy();
    res.redirect('/auth/sign-in')
   }else{
    res.redirect('/auth/sign-out')
   }
})
module.exports = router;