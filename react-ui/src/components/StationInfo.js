import React, { PureComponent } from 'react';

export default class StationInfo extends PureComponent {

	_renderInfo() {
		const {display, info, left, top} = this.props;

		if (display) {
			return info && (
				<div className='tooltip' style={{ left, top }}>
					<div>Name: {info.properties.name} </div>
				</div>
			);
		}
	}

	render() {

		return (
			<div>
				{this._renderInfo()}
			</div>
		);
	}
}