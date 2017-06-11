import constants from '../constants'

export default {
    profilesReceived: (profiles) => {
    	return {
    		type: constants.PROFILES_RECEIVED,   //type: actions,
    		profiles: profiles
    	}
    }
}