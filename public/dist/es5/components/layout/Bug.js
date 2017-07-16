"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions"));

var connect = require("react-redux").connect;
var Bug = (function (Component) {
    function Bug() {
        _classCallCheck(this, Bug);

        _get(Object.getPrototypeOf(Bug.prototype), "constructor", this).call(this);
        this.state = {
            solution: {
                text: "" }
        };
    }

    _inherits(Bug, Component);

    _prototypeProperties(Bug, null, {
        componentDidMount: {
            value: function componentDidMount() {
                var _this2 = this;
                var _this = this;
                APIManager.get("/api/bug?slug=" + this.props.slug, null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    console.log(JSON.stringify(response.results));
                    var bugs = response.results;
                    _this2.props.bugsReceived(bugs);
                    _this.fetchSolutions();
                });
            },
            writable: true,
            configurable: true
        },
        fetchSolutions: {
            value: function fetchSolutions() {
                var _this = this;
                console.log("fetchSolutions: ");
                console.log("this.props.bug.id: " + JSON.stringify(this.props.bug.id));

                if (this.props.bug.id == null) {
                    return;
                }

                APIManager.get("/api/solution?bug=" + this.props.bug.id, null, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    console.log(JSON.stringify(response.results));
                    var solutions = response.results;
                    _this.props.solutionsReceived(solutions);
                });
            },
            writable: true,
            configurable: true
        },
        updateSolution: {
            value: function updateSolution(event) {
                event.preventDefault();
                console.log("updateSolution: " + event.target.id + " == " + event.target.value);
                var updatedSolution = Object.assign({}, this.state.solution);
                updatedSolution[event.target.id] = event.target.value;
                this.setState({
                    solution: updatedSolution
                });
            },
            writable: true,
            configurable: true
        },
        submitSolution: {
            value: function submitSolution(event) {
                var _this = this;
                event.preventDefault();
                if (this.props.currentUser == null) {
                    alert("Please log in to add new solution!");
                    return;
                }


                var solution = Object.assign({}, this.state.solution);
                solution.bug = this.props.bug.id;
                solution.profile = this.props.currentUser.id;
                console.log(JSON.stringify(solution));
                APIManager.post("/api/solution", solution, function (err, response) {
                    if (err) {
                        var msg = err.message || err;
                        alert(msg);
                        return;
                    }

                    console.log(JSON.stringify(response.result));
                    var solution = response.result;
                    _this.props.solutionCreated(solution);
                });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var solutionList = this.props.solutions.map(function (solution, i) {
                    return (
                        //<li key={i}>{solution.text}</li>
                        React.createElement(
                            "a",
                            { key: i, className: "list-group-item" },
                            React.createElement(
                                "h4",
                                { className: "list-group-item-heading" },
                                solution.text
                            ),
                            React.createElement(
                                "p",
                                { className: "list-group-item-text" },
                                solution.text
                            )
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
                                        "h3",
                                        null,
                                        "Add Your Solution"
                                    ),
                                    React.createElement("textarea", { onChange: this.updateSolution.bind(this), className: "form-control", type: "text", id: "text", placeholder: "Provide Your Solution or Contribute Your Response to or Experience with this bug " }),
                                    React.createElement("br", null),
                                    React.createElement(
                                        "button",
                                        { onClick: this.submitSolution.bind(this) },
                                        "Submit"
                                    ),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("hr", { style: { borderTop: "1px solid red #444" } }),
                                    solutionList
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

    return Bug;
})(Component);

var stateToProps = function (state) {
    var bugsArray = state.bug.list;

    return {
        bug: bugsArray.length == 0 ? { text: "" } : bugsArray[0],
        currentUser: state.account.currentUser,
        solutions: state.solution.list
    };
};

var dispatchToProps = function (dispatch) {
    return {
        bugsReceived: function (bugs) {
            return dispatch(actions.bugsReceived(bugs));
        },
        solutionsReceived: function (solutions) {
            return dispatch(actions.solutionsReceived(solutions));
        },
        solutionCreated: function (solution) {
            return dispatch(actions.solutionCreated(solution));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Bug);
// _this.fetchSolutions()