function makeGeojson(data) {
	
	let geojson = {
		type: 'FeatureCollection',
		features: []
	};

	for (let index in data) {

		let lat = data[index].location.latitude;
		let lon = data[index].location.longitude;

		let obj = {
			type: 'Feature',
			properties: {
				city: data[index].location.city,
				country: data[index].location.country,
				company: []
			},
			geometry: {
				coordinates: [lon, lat],
				type: 'Point'
			}
		};

		if (data[index].company != null)
			obj.properties.company = data[index].company.slice();

		geojson.features.push(obj);
	}

	return geojson;
}

export default makeGeojson;