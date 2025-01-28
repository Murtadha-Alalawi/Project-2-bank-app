const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const User = require('../models/user')
const Card = require('../models/card');
const card = require('../models/card');
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
//show per card
router.get("/:cardId/card", async (req,res)=>{
    try {
        // const currentUser = await User.findById(req.session._id).populate('cards')
        // console.log(currentUser)
        const card = await Card.findById(req.params.cardId)
        console.log("CARDS", card)
        res.render('applications/card.ejs',{card:card})
    } catch (error) {
        res.render('applications/error.ejs')
    }
})


//create new account
router.post('/accounts', async (req,res)=>{
    try {
        
        req.body.user = req.session.user._id
        await Account.create(req.body)
        res.redirect(`/users/${req.session.user._id}/bank-accounts`)
    } catch (error) {
        console.log(error)
        res.render('applications/error.ejs')
    }
})


// show per account
router.get("/:accountId/account", async (req,res)=>{
    try {
        const account = await Account.findById(req.params.accountId)
        res.render('applications/account.ejs',{account:account})
    } catch (error) {
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
//delete card
router.delete('/:cardId', async (req,res)=>{
    try {
        const card = await Card.findByIdAndDelete(req.params.cardId)
        res.redirect(`/users/${req.session.user._id}/bank-accounts`)
    } catch (error) {
        res.render('applications/error.ejs')
    }
})
//delete account
router.delete('/account/:accountId', async (req,res)=>{
    try {
        console.log(req.params)
        const account = await Account.findByIdAndDelete(req.params.accountId)
        res.redirect(`/users/${req.session.user._id}/bank-accounts`)
    } catch (error) {
        res.render('applications/error.ejs')
    }
})
//update account
router.get('/:accountId/edit', async (req,res)=>{
    try {
        const account = await Account.findById(req.params.accountId)
        res.render('applications/edit.ejs', {
            account:account
        })
    } catch (error) {
        res.render('applications/error.ejs')
    }
})
router.put('/:accountId', async (req,res)=>{
    const account = await Account.findById(req.params.accountId)
    console.log("checking req body", req.body)
    account.set(req.body)
    await account.save()
    console.log("account", account)
    res.redirect(`/users/${req.session.user._id}/bank-accounts`)
})
module.exports = router;