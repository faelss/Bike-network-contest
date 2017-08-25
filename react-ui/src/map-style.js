import { fromJS } from 'immutable';
import MAP_STYLE from './map-style/map-style-basic-v8.json';

export const dataLayer = fromJS({
	id: 'data',
  	source: 'networks',
	type: 'symbol',
	interactive: true,
	layout: {
		'icon-image': 'bicycle-15'
	}
});

export const defaultMapStyle = fromJS(MAP_STYLE);