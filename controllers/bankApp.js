const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const User = require('../models/user')
const Card = require('../models/card');


//show 
router.get('/', async (req, res) => {
   try {
    const cards = await Card.find({user:req.session.user._id})
    const currentUser = await User.findById(req.session.user._id)
    console.log(currentUser)
    res.render('index.ejs',{application:currentUser.applications, cards:cards})
   } catch (error) {
    res.render('applications/error.ejs')
   }
})

// show card
router.get('/show', async (req,res)=>{
    console.log("In SHOW ROUTE")
    try {
        const currentUser = await User.findById(req.session.user._id)
        const cards = await Card.find({user:req.session.user._id})
        const account = await Account.find({user:req.session.user._id})
        console.log(currentUser)
        // const application = currentUser.applications.id(req.params.applicationId)
        // console.log(application)
        // if (!application) {
        //     return res.render('error.ejs')
        // }
        
        res.render('applications/show.ejs', { account, cards })
    } catch (error) {
        console.log(error)
        res.render('error.ejs')
    }
})
//create new cards 
router.post('/cards', async (req,res)=>{
    try {
        console.log(req.body)
        req.body.user = req.session.user._id
        await Card.create(req.body)
        res.redirect(`/users/${req.session.user._id}/bank-accounts`)
    } catch (error) {
        console.log(error)
        res.render('applications/error.ejs')
    }
})



//show card
router.get("/users/:userId/bank-accounts/show/:applicationId", async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.userId)

        const application = currentUser.applications.id(req.params.applicationId)

        res.render('applications/show.ejs',{application:application})
    } catch (error) {
       
        res.render('applications/error.ejs')
    }
})

// Create new account route
router.post('/accounts', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.applications.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/bank-accounts`)
    } catch (error) {
        console.log(error)
        res.render('applications/error.ejs')
    }
})

// Show form for new account
router.get('/new', async (req, res) => {
    try {
        res.render('applications/new.ejs')
    } catch (error) {
        res.render('applications/error.ejs')
    }
})

//delete card and account
router.delete('/:applicationId', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)

        currentUser.applications.id(req.params.applicationId).deleteOne()

        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        res.render('applications/error.ejs')

    }
})

//edit card

router.get('/:applicationId/edit', async (req,res)=>{
    res.render('applications/edit.ejs')
})
//update account
router.get('/:applicationdId/edit', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationdId)
        res.render('applications/edit.ejs', {
            application:application
        })
    } catch (error) {
        res.render('applications/error.ejs')
    }

})
//update card 
router.put('/:applicationId', async (req,res)=>{

    const currentUser = await User.findById(req.session.user._id)

    const application = currentUser.applications.id(req.params.applicationId)

    application.set(req.body)

    res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`)
})






module.exports = router;