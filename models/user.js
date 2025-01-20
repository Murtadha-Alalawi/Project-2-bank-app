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
    applicationDate:
{type: Date,
required: true
},
    applicationStatus:
{type: String,
required: ["pending","approved","rejected"]
},
    password:
{type: String,
required: true
},
    confirmPassword:
{type: String,
required: true
}
})

const userSchema = new mongoose.Schema({
   email:
    {type: String,
    required: true,
    unique: true},
   password:
    {type: String,
    required: true},
    applications: [applicationSchema]
})

module.exports = mongoose.model('User', userSchema)
