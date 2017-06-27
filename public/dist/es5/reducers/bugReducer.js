"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {

    list: []

};

module.exports = function (_x, action) {
    var state = arguments[0] === undefined ? initialState : arguments[0];
    var updated = Object.assign({}, state);
    switch (action.type) {
        case constants.BUGS_RECEIVED:
            // console.log('BUGS_RECEIVED: '+JSON.stringify(action.bugs))
            updated.list = action.bugs;
            return updated;

        case constants.BUG_CREATED:
            var updatedList = Object.assign([], updated.list);
            updatedList.push(action.bug);
            updated.list = updatedList;
            return updated;

        default:
            return state;
    }
};