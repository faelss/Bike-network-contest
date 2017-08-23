import React, { Component } from 'react';
import Map from './components/Map';

class App extends Component {

	constructor() {
		super();

		this.state = {
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight,
				latitude: 40.737,
				longitude: -73.923,
				zoom: 2
			}
		};
	}

	_updateViewport(viewport) {
  		this.setState({
  			viewport: viewport
  		});
  	}

  	render() {

	    return (
	      <Map viewport={this.state.viewport} updateViewport={this._updateViewport.bind(this, )}/>
	    );
  	}
}

export default App;
