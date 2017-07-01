import constants from '../constants'

export default {
    profilesReceived: (profiles) => {
    	return {
    		type: constants.PROFILES_RECEIVED,   //type: actions,
    		profiles: profiles
    	}
    },

    profileCreated: (profile) => {   //profileCreated: (action.type) => {
    	return {
    		type: constants.PROFILE_CREATED,
    		profile: profile
    	}
    },

    currentUserReceived: function(profile){
        return {
            type: constants.CURRENT_USER_RECEIVED,
            profile: profile
        }
    },

    bugsReceived: (bugs) => {
        return {
            type: constants.BUGS_RECEIVED,
            bugs: bugs
        }
    },

    bugCreated: (bug) => {
        return{
            type: constants.BUG_CREATED,
            bug: bug
        }
    },

    tracksReceived: (tracks) => {
        return {
            type: constants.TRACKS_RECEIVED,
            tracks: tracks
        }
    },

    trackCreated: (track) => {
        return {
            type: constants.TRACK_CREATED,
            track: track
        }
    }
}