"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <li><a href="#"><i className="icon-time"></i> {this.props.track.address} </a></li>
// <li><a href="#"><i className="icon-map-marker2"></i> {this.props.track.city} </a></li>
// <ul className="entry-meta clearfix">
//     <li><span className="label label-warning">Private</span></li>

// </ul>
// <div className="entry-content">
//     <a href={'/track/'+this.props.track.slug} className="btn  btn-danger">Visit</a>
// </div>

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var TrackPreview = (function (Component) {
    function TrackPreview() {
        _classCallCheck(this, TrackPreview);

        if (Component != null) {
            Component.apply(this, arguments);
        }
    }

    _inherits(TrackPreview, Component);

    _prototypeProperties(TrackPreview, null, {
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "entry clearfix" },
                    React.createElement(
                        "div",
                        { className: "entry-image hidden-sm" },
                        React.createElement(
                            "a",
                            { href: "/track/" + this.props.track.slug },
                            React.createElement("img", { src: "images/events/thumbs/1.jpg", alt: "tenetur" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "entry-c" },
                        React.createElement(
                            "div",
                            { className: "entry-title" },
                            React.createElement(
                                "h2",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "/track/" + this.props.track.slug },
                                    this.props.track.name
                                )
                            )
                        ),
                        React.createElement("hr", { style: { borderTop: "1px solid #ddd" } })
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return TrackPreview;
})(Component);

module.exports = TrackPreview;