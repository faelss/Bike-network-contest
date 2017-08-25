import React, { Component } from 'react';
import MapGl from 'react-map-gl';

import { json as requestJson } from 'd3-request';
import { fromJS } from 'immutable';

import { defaultMapStyle, dataLayer } from './map-style.js'
import makeGeojson from './utils.js';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			mapStyle: defaultMapStyle,
			data: null,
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

	componentDidMount() {
		window.addEventListener('resize', this._resize.bind(this));
		this._resize();
		
		requestJson('http://localhost:8000/networks', (err, res) => {
			if (!err) {
				this._loadData(makeGeojson(res));
			} else {
				console.log('ERROR requestJson');
			}
		});
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

	_loadData(data) {
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
		const hoveredFeature = features && features.find(f => f.layer.id === 'data');
		this.setState({ hoveredFeature, x: offsetX, y: offsetY });
	}

	_renderInfo() {
		const { hoveredFeature, x, y} = this.state;

		return hoveredFeature && (
			<div className='tooltip' style={{ left: x, top: y}}>
				<div>Company: {hoveredFeature.properties.company} </div>
				<div>Country: {hoveredFeature.properties.country} </div>
				<div>City: {hoveredFeature.properties.city}</div>
			</div>
		);
	}


	render() {
		const { viewport, mapStyle } = this.state;

		return (
			<MapGl
				{...viewport}
				mapStyle={mapStyle}
				onViewportChange={this._onViewportChange.bind(this)}
				onHover={this._onHover.bind(this)}
				>
	
				{this._renderInfo()}

			</MapGl>
		);
	}
}

export default App;
