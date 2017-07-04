"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <Nav transparent="no" />
// <li key={bug._id}>{bug.title}</li>
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var Nav = require("../containers").Nav;
var actions = _interopRequire(require("../../actions"));

var connect = require("react-redux").connect;
var Track = (function (Component) {
    function Track() {
        _classCallCheck(this, Track);

        _get(Object.getPrototypeOf(Track.prototype), "constructor", this).call(this);
        this.state = {
            track: {
                name: ""
            },
            bug: {
                title: "",
                detail: "",
                response: ""
            }
        };
    }

    _inherits(Track, Component);

    _prototypeProperties(Track, null, {
        componentDidMount: {
            value: function componentDidMount() {
                var _this2 = this;
                var _this = this; //var this = _this
                // console.log('Track.js layout componentDidMount: ')
                // APIManager.get('/api/track/'+this.props.slug, null, (err, response) => {
                APIManager.get("/api/track?slug=" + this.props.slug, null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }
                    console.log(JSON.stringify(response.results)); //(response.result))
                    var tracks = response.results;
                    // this.setState({
                    // 	track: track
                    // })
                    _this2.props.tracksReceived(tracks);
                    _this.fetchPosts();
                });
            },
            writable: true,
            configurable: true
        },
        fetchPosts: {
            value: function fetchPosts() {
                var _this = this;
                console.log("fetchPosts: ");
                console.log(JSON.stringify(this.props.track._id));
                if (this.props.track._id == null) {
                    return;
                }

                var id = this.props.track._id;
                APIManager.get("/api/bug?track=" + id, null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    console.log(JSON.stringify(response.results));
                    _this.props.bugsReceived(response.results);
                });
            },
            writable: true,
            configurable: true
        },
        updateBug: {
            value: function updateBug(event) {
                event.preventDefault();
                console.log(event.target.id + " == " + event.target.value);
                var updatedBug = Object.assign({}, this.state.bug);
                updatedBug[event.target.id] = event.target.value;
                var bug = updatedBug;
                this.setState({
                    bug: bug
                });
                console.log("updatedBug: " + JSON.stringify(this.state.bug));
            },
            writable: true,
            configurable: true
        },
        submitBug: {
            value: function submitBug(event) {
                var _this = this;
                event.preventDefault();
                if (this.props.currentUser == null) {
                    alert("Please log in to record new bug");
                    return;
                }

                var bug = Object.assign({}, this.state.bug); // var bug = this.state.bug
                console.log(JSON.stringify(this.props.track._id));
                bug.track = this.props.track._id;
                bug.profile = this.props.currentUser.id;

                APIManager.post("/api/bug", bug, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }
                    _this.props.bugCreated(response.result);
                    console.log("submitBug: " + JSON.stringify(response.result));
                });

            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var bugList = this.props.bugs.map(function (bug, i) {
                    return React.createElement(
                        "a",
                        { key: i, href: "#", className: "list-group-item" },
                        React.createElement(
                            "h4",
                            { className: "list-group-item-heading" },
                            bug.title
                        ),
                        React.createElement(
                            "p",
                            { className: "list-group-item-text" },
                            bug.detail
                        )
                    );
                });

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "section",
                        { id: "content" },
                        React.createElement(
                            "div",
                            { className: "content-wrap" },
                            React.createElement(
                                "div",
                                { className: "container clearfix" },
                                React.createElement(
                                    "div",
                                    { className: "postcontent nobottommargin clearfix" },
                                    React.createElement(
                                        "h4",
                                        null,
                                        this.props.track.name
                                    ),
                                    React.createElement("input", { onChange: this.updateBug.bind(this), placeholder: "Bug Title", id: "title", className: "form-control", type: "text" }),
                                    React.createElement("br", null),
                                    React.createElement("textarea", { onChange: this.updateBug.bind(this), placeholder: "Bug Detail", id: "detail", className: "form-control" }),
                                    React.createElement("br", null),
                                    React.createElement("textarea", { onChange: this.updateBug.bind(this), placeholder: "Response", id: "response", className: "form-control" }),
                                    React.createElement("br", null),
                                    React.createElement(
                                        "button",
                                        { onClick: this.submitBug.bind(this), className: "btn btn-success" },
                                        "Record Bug"
                                    ),
                                    React.createElement("br", null),
                                    React.createElement("hr", { style: { borderTop: "1px solid red #444" } }),
                                    bugList
                                )
                            )
                        )
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Track;
})(Component);

var stateToProps = function (state) {
    // var tracksArray = state.tracks.list
    var tracksArray = state.track.list;

    return {
        track: tracksArray.length == 0 ? { name: "" } : tracksArray[0],
        bugs: state.bug.list,
        currentUser: state.account.currentUser
    };
};

var dispatchToProps = function (dispatch) {
    return {
        tracksReceived: function (tracks) {
            return dispatch(actions.tracksReceived(tracks));
        },
        bugCreated: function (bug) {
            return dispatch(actions.bugCreated(bug));
        },
        bugsReceived: function (bugs) {
            return dispatch(actions.bugsReceived(bugs));
        } };
};

module.exports = connect(stateToProps, dispatchToProps)(Track);
// currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
// currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))