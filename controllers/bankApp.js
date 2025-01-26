const express = require('express');
const router = express.Router();
const User = require('../models/user')


//show all accounts
router.get('/', async (req, res) => {
   try {
    const currentUser = await User.findById(req.session.user._id)


    res.render('index.ejs',{application:currentUser.applications})
   } catch (error) {
    res.render('error.ejs')
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
        res.render('error.ejs')
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
        res.render('error.ejs')
    }
})

//edit account
router.get('/:applicationId/edit', async (req,res)=>{
    res.render('applications/edit.ejs')
})

router.put('/:applicationId', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        application.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/bank-accounts`)
    } catch (error) {
        console.log(error)
        res.render('error.ejs')
    }
})


module.exports = router;