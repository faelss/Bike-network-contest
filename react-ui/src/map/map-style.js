import { fromJS } from 'immutable';
import MAP_STYLE from './map-style-basic-v8.json';

export const dataLayer = fromJS({
	id: 'network',
  	source: 'networks',
	interactive: true,
	type: 'symbol',
	layout: {
		'icon-image': 'bicycle-15'
	}
});

export const stationLayer = fromJS({
	id: 'station',
	source: 'stations',
	interactive: true,
	type: 'circle',
	paint: {
	    'circle-radius': 5,
	    'circle-color': '#007cbf'
	}
});

export const defaultMapStyle = fromJS(MAP_STYLE);