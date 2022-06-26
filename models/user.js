const mongoose = require('mongoose')
const schema = mongoose.Schema
const user_schema = new schema({
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})
const user = mongoose.model('User',user_schema)
module.exports = user