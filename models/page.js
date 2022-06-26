const mongoose = require('mongoose')
const schema = mongoose.Schema

const page_schema= new schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    contents:{
        type: mongoose.SchemaTypes.Array,
    },
    link: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    }
})
const page = mongoose.model('page',page_schema)
module.exports = page