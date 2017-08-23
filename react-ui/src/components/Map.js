import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
	render() {
		return (
			<ReactMapGL 
				width={800}
				height={600}
				latitude={37.7577}
	        	longitude={-122.4376}
	        	zoom={8}
	        	onViewportChange={(viewport) => {
		          const {width, height, latitude, longitude, zoom} = viewport;
		          // Optionally call `setState` and use the state to update the map.
		        }}
		    />
		);
	}
}

export default Map;