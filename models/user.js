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
required: true,
default: Date.now
},
type: {
    type: String,
    required: ["Debit","Credit","Visa","Mastercard"]
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