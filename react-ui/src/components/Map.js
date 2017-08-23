import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

class Map extends Component {
	render() {
		const { viewport, updateViewport } = this.props;
		return (
			<ReactMapGL 
				width={viewport.width}
				height={viewport.height}
				latitude={viewport.latitude}
	        	longitude={viewport.longitude}
	        	zoom={viewport.zoom}
	        	onViewportChange={updateViewport}>
	        	<div style={{position: 'absolute', right: 0}}>
	        		<NavigationControl onViewportChange={updateViewport}/>
	        	</div>
		    </ReactMapGL>
		);
	}
}

export default Map;