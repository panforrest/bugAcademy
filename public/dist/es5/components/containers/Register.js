"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Signup = require("../presentation").Signup;
var APIManager = require("../../utils").APIManager;
var Register = (function (Component) {
    function Register() {
        _classCallCheck(this, Register);

        if (Component != null) {
            Component.apply(this, arguments);
        }
    }

    _inherits(Register, Component);

    _prototypeProperties(Register, null, {
        register: {
            // constructor(){
            //     this.state
            // }

            value: function register(visitor) {
                APIManager.post("/account/register", visitor, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    // console.log('register: '+JSON.stringify(response))
                    // this.props.profileCreated(response.profile)
                    console.log("PROFILE CREATED:" + JSON.stringify(response));
                    window.location.href = "/account";
                });
            },
            writable: true,
            configurable: true
        },
        login: {
            value: function login(credentials) {
                APIManager.post("/account/login", credentials, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        // console.log(msg)
                        alert(msg);
                        return;
                    }

                    // console.log(JSON.stringify(response))
                    // this.props.currentUserReceived(response.profile)
                    console.log("USER LOGGED IN: " + JSON.stringify(response));
                    window.location.href = "/account";
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
                    "This is Register container.",
                    React.createElement(Signup, { onRegister: this.register.bind(this), onLogin: this.login.bind(this) })
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Register;
})(Component);

module.exports = Register;