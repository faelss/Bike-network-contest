const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let networkStations = new Schema({
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
    name: String,
    stations:[{
        report:{
            status:{
                default: "OPEN",
                type: String
            },
            count:{
                default: 0,
                type: Number
            }
        },
        empty_slots: Number,
        free_bikes: Number,
        id: String,
        latitude: Number,
        longitude: Number,
        name: String,
        timestamp: Date
    }]
});

module.exports = mongoose.model('NetworksStations',networkStations);