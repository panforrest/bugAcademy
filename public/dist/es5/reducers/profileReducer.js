"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  list: [] };

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  //export default (state=initialState, actions){
  var updated = Object.assign({}, state); //let updated = Object.assign([], state)
  switch (action.type) {
    case constants.PROFILES_RECEIVED:
      // console.log('PROFILES_RECEIVED: '+JSON.stringify(action.profiles))
      updated.list = action.profiles; // var updatedState = Object.assign([], state)
      return updated; //return updatedState

    case constants.PROFILE_CREATED:
      console.log("PROFILE_CREATED: " + JSON.stringify(action.profile));
      // updated['user'] = action.profile
      var updatedList = Object.assign([], updated.list); //let updatedList = Object.assign([], state)
      updatedList.push(action.profile);
      updated.list = updatedList; //DON'T FORGET THIS LINE
      return updated;

    default:
      return state;
  }
};

//profiles: []
// user: {}