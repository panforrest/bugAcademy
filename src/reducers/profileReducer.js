import constants from '../constants'

var initialState = {
	list: []  //profiles: []
}

export default (state=initialState, action) => {  //export default (state=initialState, actions){
	switch(action.type){
		case constants.PROFILES_RECEIVED:
            // var updatedState = Object.assign([], state)
            console.log('PROFILES_RECEIVED: '+JSON.stringify(action.profiles))
            return state  //return updatedState

        default:
            return state
	} 
}