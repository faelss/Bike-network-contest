import {PerspectiveMercatorViewport} from 'viewport-mercator-project'; 

export function makeGeojsonNetwork(data) {

	return {
		type: 'FeatureCollection',
		features: data.map((d) => {
			return {
				type: 'Feature',
				properties: {
					id: d.id,
					city: d.location.city,
					country: d.location.country,
					name: d.name
				},
				geometry:{
					coordinates: [d.location.longitude, d.location.latitude],
					type: 'Point'
				}
			}
		})
	}
}

export function makeGeojsonStation(data) {

	// bug
	if (data.constructor === Array) data = data[0];

	return {
		type: 'FeatureCollection',
		features: data.stations.map((s) => {
			return {
				type: 'Feature',
				properties: {
					name: s.name,
					empty_slots: s.empty_slots,
					free_bikes: s.free_bikes,
					review: s.review.slice(),
					report: {
						safe_location: {
							count: s.report.safe_location.count, 
							status: s.report.safe_location.status
						},
						status_location: {
							count: s.report.status_location.count,
							status: s.report.status_location.status
						}
					}
				},
				geometry:{
					coordinates: [s.longitude, s.latitude],
					type: 'Point'
				}
			}
		})
	}
}

export function flyBounds(width, height, features) {

	return new PerspectiveMercatorViewport({width, height})
				.fitBounds(features.map(( f ) => {
					return f.geometry.coordinates.slice();
				}));
}