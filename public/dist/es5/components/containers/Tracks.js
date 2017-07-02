"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <li key={i}>{this.props.track.name}</li>
// <li key={track._id}><a href={'/track/'+track.slug}>{track.name}</a></li>
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions"));

var connect = require("react-redux").connect;
var TrackPreview = _interopRequire(require("./TrackPreview"));

var Admin = _interopRequire(require("./Admin"));

var Tracks = (function (Component) {
	function Tracks(context, props) {
		_classCallCheck(this, Tracks);

		_get(Object.getPrototypeOf(Tracks.prototype), "constructor", this).call(this, context, props);
		this.state = {
			tracks: []
		};
	}

	_inherits(Tracks, Component);

	_prototypeProperties(Tracks, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				// console.log('Tracks container componentDidMount: ')
				APIManager.get("/api/track", null, function (err, response) {
					if (err) {
						var msg = err.message || err;
						alert(msg);
						return;
					}

					// console.log('Tracks container componentDidMount: '+JSON.stringify(response.results))
					var results = response.results;
					// this.setState({
					// 	tracks: results
					// })
					_this.props.tracksReceived(response.results);
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var trackList = this.props.tracks.map(function (track, i) {
					return React.createElement(TrackPreview, { key: track._id, track: track });
				});

				return React.createElement(
					"div",
					{ className: "container clearifx" },
					React.createElement(
						"div",
						{ className: "col_three_fifth bothsidebar nobottommargin" },
						React.createElement(
							"div",
							{ className: "fancy-title title-border" },
							React.createElement(
								"h3",
								null,
								"Tracks"
							)
						),
						React.createElement(
							"div",
							{ id: "posts", className: "events small-thumbs" },
							trackList
						)
					),
					React.createElement(Admin, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Tracks;
})(Component);

var stateToProps = function (state) {
	return {
		tracks: state.track.list
	};
};

var dispatchToProps = function (dispatch) {
	return {
		tracksReceived: function (tracks) {
			return dispatch(actions.tracksReceived(tracks));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(Tracks);