const express = require('express');
const router = express.Router();

const User = require('../models/user')



router.get('/', async (req, res) => {
   try {
    const currentUser = await User.findById(req.session.user._id)

    res.render('index.ejs',{application:currentUser.applications})
   } catch (error) {
    res.redirect('/')
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
        res.redirect('/')
    }
})



module.exports = router;