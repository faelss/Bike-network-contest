const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let networkStations = new Schema({
    company:[{
        type: String
    }],
    href: String,
    id: String,
    licence:{
        name: String,
        url: String
    },
    location:{
        city: String,
        country: String,
        latitude: Number,
        longitude: Number
    },
    name: String,
    stations:[{
        empty_slots: Number,
        extra:{
            address: String,
            banking: Boolean,
            bonus: Boolean,
            last_update: Number,
            slots: Number,
            status: String,
            uid: Number
        },
        free_bikes: Number,
        id: String,
        latitude: Number,
        longitude: Number,
        name: String,
        timestamp: String
    }]
});