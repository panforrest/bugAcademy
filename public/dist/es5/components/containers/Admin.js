"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// <h2>User is not logged in. </h2>
// export default connect(stateToProps, dispatchToProps)(Admin)
// <h3>Record A New Bug</h3>
// <input onChange={this.updateBug.bind(this)} type="text" id="title" placeholder="Title" /><br />
// <textarea onChange={this.updateBug.bind(this)} type="text" id="detail" placeholder="Detail" /><br />
// <textarea onChange={this.updateBug.bind(this)} type="text" id="response" placeholder="Response" /><br />
// <input onClick={this.submitBug.bind(this)} type="submit" value="Submit" />

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var actions = _interopRequire(require("../../actions"));

var connect = require("react-redux").connect;
var Signup = require("../presentation").Signup;
var APIManager = require("../../utils").APIManager;
var Admin = (function (Component) {
    function Admin() {
        _classCallCheck(this, Admin);

        _get(Object.getPrototypeOf(Admin.prototype), "constructor", this).call(this);
        this.state = {
            bug: {
                title: "",
                detail: "",
                response: ""
            },
            track: {
                name: "",
                slug: ""
            }
        };
    }

    _inherits(Admin, Component);

    _prototypeProperties(Admin, null, {
        componentDidMount: {
            value: function componentDidMount() {
                var _this = this;
                // console.log('componentDidMount: ')
                APIManager.get("/account/currentuser", null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }
                    console.log("Admin.js: ", JSON.stringify(response.profile));
                    _this.props.currentUserReceived(response.profile);
                });
            },
            writable: true,
            configurable: true
        },
        register: {
            value: function register(visitor) {
                var _this = this;
                APIManager.post("/account/register", visitor, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    console.log("register: " + JSON.stringify(response));
                    _this.props.profileCreated(response.profile);
                });
            },
            writable: true,
            configurable: true
        },
        login: {
            value: function login(credentials) {
                var _this = this;
                APIManager.post("/account/login", credentials, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        // console.log(msg)
                        alert(msg);
                        return;
                    }

                    console.log(JSON.stringify(response));
                    _this.props.currentUserReceived(response.profile);
                });
            },
            writable: true,
            configurable: true
        },
        updateBug: {
            value: function updateBug(event) {
                event.preventDefault();
                // console.log(event.target.id+" == "+event.target.value)
                var updatedBug = Object.assign({}, this.state.bug);
                updatedBug[event.target.id] = event.target.value; //updatedBug['event.target.id'] = event.target.value
                this.setState({
                    bug: updatedBug
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
                var bug = this.state.bug;
                bug.profile = this.props.currentUser.id;

                APIManager.post("/api/bug", bug, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        // console.log(msg)
                        alert(JSON.stringify(msg));
                        return;
                    }
                    console.log("submit: " + JSON.stringify(response.result));
                    var result = response.result;
                    _this.props.bugCreated(bug);
                });
            },
            writable: true,
            configurable: true
        },
        updateTrack: {
            value: function updateTrack(event) {
                event.preventDefault();
                console.log("updateTrack: " + event.target.id + " == " + event.target.value);
                var updatedTrack = Object.assign({}, this.state.track);
                updatedTrack[event.target.id] = event.target.value;
                this.setState({
                    track: updatedTrack
                });
            },
            writable: true,
            configurable: true
        },
        submitTrack: {
            value: function submitTrack(event) {
                var _this = this;
                event.preventDefault();
                console.log("to submitTrack: " + JSON.stringify(this.state.track));
                var track = this.state.track;
                var name = track.name;
                var parts = name.split(" ");

                var slug = "";
                for (var i = 0; i < parts.length; i++) {
                    var word = parts[i];
                    slug += word;
                    if (i != parts.length - 1) slug += "-";
                }

                slug = slug.replace("?", "-");
                track.slug = slug;
                console.log(JSON.stringify(track));


                APIManager.post("/api/track", track, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(JSON.stringify(msg));
                        return;
                    }

                    console.log("track submitted: " + JSON.stringify(response.result));
                    _this.props.trackCreated(response.result);
                    window.location.href = "/track/" + track.slug;
                });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    this.props.currentUser == null ? React.createElement(Signup, { onRegister: this.register.bind(this), onLogin: this.login.bind(this) }) : React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "h2",
                            null,
                            "Welcome, ",
                            this.props.currentUser.email
                        ),
                        React.createElement(
                            "h3",
                            null,
                            "Start A New Track"
                        ),
                        React.createElement("input", { onChange: this.updateTrack.bind(this), type: "text", id: "name", placeholder: "Track Name" }),
                        React.createElement("br", null),
                        React.createElement("input", { onClick: this.submitTrack.bind(this), type: "submit", value: "Submit" })
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Admin;
})(Component);

var stateToProps = function (state) {
    return {
        profiles: state.profile.list,
        currentUser: state.account.currentUser
    };
};

var dispatchToProps = function (dispatch) {
    return {
        profileCreated: function (profile) {
            return dispatch(actions.profileCreated(profile));
        },
        //profilesReceived: (profiles) => disptach(actions.profilesReceived(profiles)),
        currentUserReceived: function (profile) {
            return dispatch(actions.currentUserReceived(profile));
        },
        bugCreated: function (bug) {
            return dispatch(actions.bugCreated(bug));
        },
        trackCreated: function (track) {
            return dispatch(actions.trackCreated(track));
        }

    };
};

module.exports = connect(stateToProps, dispatchToProps)(Admin);