import constants from '../constants'

var initialState = {

	list: []

}

export default (state=initialState, action) => {
    var updated = Object.assign({}, state)
    switch(action.type){
    	case constants.BUGS_RECEIVED:
    	    // console.log('BUGS_RECEIVED: '+JSON.stringify(action.bugs))
            updated['list'] = action.bugs
            return updated

        case constants.BUG_CREATED:
            var updatedList = Object.assign([], updated.list) 
            updatedList.push(action.bug)   
            updated['list'] = updatedList
            return updated

    	default:
    	    return state
    }

}