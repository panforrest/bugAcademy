import constants from '../constants'

var initialState = {
	list: [],  //profiles: []
	// user: {}
}

export default (state=initialState, action) => {  //export default (state=initialState, actions){
	let updated = Object.assign({}, state)  //let updated = Object.assign([], state)
	switch(action.type){
		case constants.PROFILES_RECEIVED:            
            // console.log('PROFILES_RECEIVED: '+JSON.stringify(action.profiles))
            updated['list'] = action.profiles  // var updatedState = Object.assign([], state)
            return updated  //return updatedState

        case constants.PROFILE_CREATED:
            console.log('PROFILE_CREATED: '+JSON.stringify(action.profile))
            // updated['user'] = action.profile
            let updatedList = Object.assign([], updated.list)  //let updatedList = Object.assign([], state)
            updatedList.push(action.profile)
            updated['list'] = updatedList   //DON'T FORGET THIS LINE
            return updated

        default:
            return state
	} 
}