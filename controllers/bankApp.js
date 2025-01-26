const express = require('express');
const router = express.Router();
const User = require('../models/user')


//show all accounts
router.get('/', async (req, res) => {
   try {
    const currentUser = await User.findById(req.session.user._id)

    res.render('index.ejs',{application:currentUser.applications})
   } catch (error) {
    res.render('applications/error.ejs')
   }
})

//create new account
router.get('/new', async (req,res)=>{
    res.render('applications/new.ejs')
})

//save new account to database
router.post('/', async (req,res)=>{
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

// show account
router.get('/:applicationId/show', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        console.log(currentUser)
        const application = currentUser.applications.id(req.params.applicationId)
        console.log(application)
        if (!application) {
            return res.render('error.ejs')
        }
        
        res.render('applications/show.ejs', { application })
    } catch (error) {
        console.log(error)
        res.render('error.ejs')}
    })
//=================================================
//show account
router.get("/users/:userId/bank-accounts/show/:applicationId", async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.userId)

        const application = currentUser.applications.id(req.params.applicationId)

        res.render('applications/show.ejs',{application:application})
    } catch (error) {
       
        res.render('applications/error.ejs')
    }
})

//delete account
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

//edit account

router.get('/:applicationId/edit', async (req,res)=>{
    res.render('applications/edit.ejs')
//=======================
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

})})

router.put('/:applicationId', async (req,res)=>{

//==================================
    const currentUser = await User.findById(req.session.user._id)

    const application = currentUser.applications.id(req.params.applicationId)

    application.set(req.body)

    res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`)
})

//error page
router.get('/error', (req,res)=>{
    res.render('applications/error.ejs')
})

//show balance
router.get('/:applicationId/balance', async (req,res)=>{
    const currentUser = await User.findById(req.session.user._id)
    const application = currentUser.applications.id(req.params.applicationId)
    res.render('applications/balance.ejs', {application:application})
})

//update balance
router.post('/:applicationId/balance', async (req,res)=>{

    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        application.set(req.body)
        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/bank-accounts`)
    } catch (error) {
        console.log(error)
        res.render('error.ejs')
//==============================
        res.redirect(`/applications/${application._id}/balance`)
    }
})

//deposit money
router.get('/:applicationId/deposit', async (req,res)=>{
    const currentUser = await User.findById(req.session.user._id)
    const application = currentUser.applications.id(req.params.applicationId)
    res.render('applications/deposit.ejs', {application:application})
})

router.post('/:applicationId/deposit', async (req,res)=>{
    try {   
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        application.balance = req.body.balance
        await currentUser.save()
        res.redirect(`/applications/${application._id}/deposit`)
    } catch (error) {
        res.render('applications/error.ejs')

    }
})


module.exports = router;