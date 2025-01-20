const { application } = require('express')
const mongoose = require('mongoose')
const applicationSchema = new mongoose.Schema({
   firstName:
    {type: String,
    required: true
},
    lastName:
{type: String,
required: true
},
    email:
{type: String,
required: true
},
    age:
{type: Number,
required: true,
min: 18,
max: 100
},
    phone:
{type: String,
required: true
},
    address:
{type: String,
required: true
},
    job:
{type: String,
required: ["student","employee","unemployed","self-employed","retired","other"]
},
    status:
{type: String,
required:["pending","approved","rejected"]
},
    pplicationDate:
{type: Date,
required: true
},


   
})

const userSchema = new mongoose.Schema({
   username:
    {type: String,
    required: true,
    unique: true},
   password:
    {type: String,
    required: true},
    applications: [applicationSchema]
})

module.exports = mongoose.model('User', userSchema)
