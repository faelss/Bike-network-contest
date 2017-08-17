const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let networks = new Schema({
    company:[{
        type: String
    }],
    href: String,
    id: String,
    location:{
        city: String,
        country: String,
        latitude: Number,
        longitude: Number
    },
    name: String
});

module.exports = mongoose.model('Networks', networks);