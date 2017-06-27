"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {

	list: []

};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var updatedState = Object.assign({}, state);
	switch (action.type) {
		case constants.TRACKS_RECEIVED:
			// console.log('TRACKS_RECEIVED: '+JSON.stringify(action.tracks))
			updatedState.list = action.tracks;
			return updatedState;

		case constants.TRACK_CREATED:
			var updatedList = Object.assign([], updatedState.list);
			updatedList.push(action.track);
			updatedState.list = updatedList;
			return updatedState;

		default:
			return state;
	}
};