import React, { Component } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import axios from 'axios';

class Map extends Component {

	constructor() {
		super();

		this.state = {
			networks: {}
		};
	}

	componentWillMount() {
		this._fetchNetworks();
	}

	_fetchNetworks() {
		axios
			.get('http://localhost:8000/networks')
			.then((res) => {
				this.setState({
					networks: res.data
				});
			})
			.catch((err) => {
				console.log('Error _fetchNetworks - ' + err);
			});
	}

	_getNetworksMarker() {
		return Object.keys(this.state.networks).map((network, index) => {
			const urlImg = 'http://www.clker.com/cliparts/e/3/F/I/0/A/google-maps-marker-for-residencelamontagne-hi.png';
			let lat = this.state.networks[index].location.latitude;
			let lon = this.state.networks[index].location.longitude;
			return (
				<Marker
					key={index}
					latitude={lat}
					longitude={lon}
					offsetLeft={-5}
					offsetTop={-5}
					>
					<img src={urlImg} width={10} height={10} alt='Marker'/>
				</Marker>
			);
		});
	}


	render() {
		const { viewport, updateViewport, style } = this.props;
		return (
			<ReactMapGL 
				{... viewport}
	        	mapStyle={style.streets}
	        	onViewportChange={updateViewport}>
	        	<div style={{position: 'absolute', right: 0}}>
	        		<NavigationControl onViewportChange={updateViewport}/>
	        	</div>
	        	{this._getNetworksMarker()}
		    </ReactMapGL>
		);
	}
}

export default Map;