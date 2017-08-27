import React, { Component } from 'react';
import MapGl, { NavigationControl } from 'react-map-gl';

import axios from 'axios';
import { fromJS } from 'immutable';

import { defaultMapStyle, dataLayer, stationLayer } from './map/map-style'
import { makeGeojsonNetwork, makeGeojsonStation, flyBounds } from './utils';

import NetworkInfo from './components/NetworkInfo';
import StationInfo from './components/StationInfo';
import Menu from './components/Menu';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			mapStyle: defaultMapStyle,
			data: null,
			display: true,
			hoveredFeature: null,
			viewport: {
				latitude: 40,
				longitude: -100,
				zoom: 2,
				bearing: 0,
				pitch: 0,
				width: 500,
				height: 500
			}
		};
	}

	_fetchNetworks() {
		axios
			.get('http://localhost:8000/networks')
			.then((res) => {
				this._loadDataNetworks(makeGeojsonNetwork(res.data));
			});
	}

	_fetchStation(id) {
		axios
			.get(`http://localhost:8000/networks/${id}`)
			.then((res) => {
				this._loadDataStation(makeGeojsonStation(res.data));
			});
	}

	componentDidMount() {
		window.addEventListener('resize', this._resize.bind(this));
		this._resize();
		this._fetchNetworks();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._resize.bind(this));
	}

	_resize() {
		this.setState({
			viewport: {
				...this.state.viewport,
				width: this.props.width || window.innerWidth,
				height: this.props.height || window.innerHeight
			}
		});
	}

	_loadDataStation(data) {
		const { display, viewport: { width, height } } = this.state;

		const mapStyle = defaultMapStyle
				.setIn(['sources', 'stations'], fromJS({type: 'geojson', data}))
				.set('layers', defaultMapStyle.get('layers').push(stationLayer));

		const viewport = flyBounds(
			width, 
			height, 
			data.features
		);

   		this.setState({ 
   			viewport,
   			display: !display,
   			data,
   			mapStyle
   		});
	}

	_loadDataNetworks(data) {
		const mapStyle = defaultMapStyle
			      .setIn(['sources', 'networks'], fromJS({type: 'geojson', data}))
			      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

   		this.setState({data, mapStyle});
	}

	_onViewportChange(viewport) {
		this.setState({ viewport });
	}

	_onHover(event) {
		const { features, srcEvent: { offsetX, offsetY }} = event;
		const { display } = this.state;

		const hoveredFeature = features && features.find(f => f.layer.id === (display ? 'network' : 'station'));
		this.setState({ hoveredFeature, x: offsetX, y: offsetY });
	}

	_onClick(event) {
		const { features } = event;
		const { display } = this.state;
		if (!display) return;
		const clickFeature = features  && features.find(f => f.layer.id === 'network');
		if (clickFeature) this._fetchStation(clickFeature.properties.id);
	}


	render() {
		const { viewport, mapStyle, display, hoveredFeature, x, y } = this.state;

		return (
			<div>
				<MapGl
					{...viewport}
					mapStyle={mapStyle}
					onViewportChange={this._onViewportChange.bind(this)}
					onHover={this._onHover.bind(this)}
					onClick={this._onClick.bind(this)}
					>

					<div style={{position: 'absolute', right: 0}}>
						<NavigationControl onViewportChange={this._onViewportChange.bind(this)}/>
					</div>
					
					<NetworkInfo 
						info={hoveredFeature} 
						left={x} 
						top={y}
						display={display}
					/>
					<StationInfo
						info={hoveredFeature} 
						left={x} 
						top={y}
						display={!display}
					/>
				</MapGl>

				<Menu />
				
			</div>
		);
	}
}

export default App;
