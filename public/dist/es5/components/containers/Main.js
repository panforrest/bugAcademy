"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// content = <div><Tracks /><Admin /></div>
// content = <Track slug={this.props.slug} />
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Tracks = _interopRequire(require("./Tracks"));

var Admin = _interopRequire(require("./Admin"));

var Track = _interopRequire(require("../layout/Track"));

// import { Track } from '../layout'

var Main = (function (Component) {
    function Main() {
        _classCallCheck(this, Main);

        if (Component != null) {
            Component.apply(this, arguments);
        }
    }

    _inherits(Main, Component);

    _prototypeProperties(Main, null, {
        componentDidMount: {
            value: function componentDidMount() {
                console.log("Main componentDidMount props.page: " + this.props.page);
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var content = null;
                var page = this.props.page;
                if (page == "home") content = React.createElement(
                    "div",
                    null,
                    React.createElement(Tracks, null),
                    React.createElement(Admin, null)
                );

                if (page == "track") content = React.createElement(Track, { slug: this.props.slug });

                return React.createElement(
                    "div",
                    null,
                    content
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Main;
})(Component);

module.exports = Main;
// console.log('page: '+JSON.stringify(this.state.page))
// alert('slug: '+JSON.stringify(this.state.slug))