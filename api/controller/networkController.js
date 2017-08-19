const mongoose = require('mongoose');
const Network = mongoose.model('Networks');
const NetworkStation = mongoose.model('NetworksStations');

class NetworkController {

	static listAllNetworks(req, res) {
		Network
		.find({})
		.then((data) => {
			res.json(data);
		}).catch((err) => {
			res.send(err);
		});
	}

	static readNetworkStation(req, res) {
		NetworkStation
		.find({
			id: req.params.id
		}).then((data) => {
			res.json(data);
		}).catch((err) => {
			res.send(err);
		});
	} 

	static updateAvailableSlots(req, res) {
        NetworkStation
        .findOneAndUpdate({
            id: req.params.id,
            'stations.id': req.params.idStation
        }, {
            $set: {
                'stations.$.empty_slots': req.body.empty_slots,
                'stations.$.free_bikes': req.body.free_bikes
            }
        }, {
            new: true
        }).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.send(err);
        });
	}

	static updateStatusLocationCount(req, res) {
        NetworkStation
        .findOneAndUpdate({
            id: req.params.id,
            'stations.id': req.params.idStation
        }, {
            $set:{
                'stations.$.report.status_location.count': req.body.count
            }
        }, {
            new: true
        }).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.send(err);
        });
    }

    static updateSafeLocationCount(req, res) {
        NetworkStation
        .findOneAndUpdate({
            id: req.params.id,
            'stations.id': req.params.idStation
        },{
            $set:{
                'stations.$.report.safe_location.count': req.body.count
            }
        },{
            new: true
        }).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.send(err);
        });
    }

    static updateReview(req, res) {
        NetworkStation
        .findOneAndUpdate({
            id: req.params.id,
            'stations.id': req.params.idStation
        },{
            $set:{
                'stations.$.review': req.body.review
            }
        },{
            new: true
        }).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.send(err);
        });
    
    }
	
}

module.exports = NetworkController;