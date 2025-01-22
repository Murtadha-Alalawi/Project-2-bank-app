const express = require('express');
const router = express.Router();

const User = require('../models/user')



router.get('/', async (req, res) => {
   try {
    const currentUser = await User.findById(req.session.user._id)

    res.render('index.ejs',{application:currentUser.applications})
   } catch (error) {
    res.render('error.ejs')
   }
})


router.get('/new', async (req,res)=>{
    res.render('application/new.ejs')
})


router.post('/', async (req,res)=>{
    try {
        
        const currentUser = await User.findById(req.session.user._id)

        currentUser.applications.push(req.body)

        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/applications`)

        

    } catch (error) {
        res.render('error.ejs')
    }
})

router.get('/applicationId', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)

        const application = currentUser.applications.id(req.params.user._id)

        res.render('applications/show.ejs',{application:application})
    } catch (error) {
       
        res.render('error.ejs')
    }
})

router.delete('/:applicationId', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)

        currentUser.applications.id(req.params.applicationId).deleteOne()

        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        res.render('error.ejs')
    }
})

router.get('/:applicationdId/edit', async (req,res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationdId)
        res.render('applications/edit.ejs', {
            application:application
        })
    } catch (error) {
        res.render('error.ejs')
    }
})

router.put('/:applicationId', async (req,res)=>{
    const currentUser = await User.findById(req.session.user._id)

    const application = currentUser.applications.id(req.params.applicationId)

    application.set(req.body)

    res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`)
})

router.get('/error', (req,res)=>{
    res.render('error.ejs')
})


module.exports = router;