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
            statusLocation:{
                status: { type: String , default: 'OPEN' },
                count: { type: Number , default: 0 }
            },
            safeLocation:{
                status: { type: Boolean , default: 'true'},
                count: { type: Number , default: 0 }
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