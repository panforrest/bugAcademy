"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

module.exports = {
    profilesReceived: function (profiles) {
        return {
            type: constants.PROFILES_RECEIVED, //type: actions,
            profiles: profiles
        };
    },

    profileCreated: function (profile) {
        //profileCreated: (action.type) => {
        return {
            type: constants.PROFILE_CREATED,
            profile: profile
        };
    },

    currentUserReceived: function (profile) {
        return {
            type: constants.CURRENT_USER_RECEIVED,
            profile: profile
        };
    },

    bugsReceived: function (bugs) {
        return {
            type: constants.BUGS_RECEIVED,
            bugs: bugs
        };
    },

    bugCreated: function (bug) {
        return {
            type: constants.BUG_CREATED,
            bug: bug
        };
    },

    tracksReceived: function (tracks) {
        return {
            type: constants.TRACKS_RECEIVED,
            tracks: tracks
        };
    },

    trackCreated: function (track) {
        return {
            type: constants.TRACK_CREATED,
            track: track
        };
    }
};