import constants from '../constants'

var initialState = {

	list: []

}

export default (state=initialState, action) => {
	let updatedState = Object.assign({}, state)
	switch(action.type){
		case constants.TRACKS_RECEIVED:
		    console.log('TRACKS_RECEIVED: '+JSON.stringify(action.tracks))
		    updatedState['list'] = action.tracks
		    return updatedState
        
        case constants.TRACK_CREATED:
            const updatedList = Object.assign([], updatedState.list)
            updatedList.push(action.track)
            updatedState['list'] = updatedList
            return updatedState

		default:
		    return state
	}
}