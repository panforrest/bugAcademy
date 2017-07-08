import constants from '../constants'

var initialState = {

    list: []

}

export default (state=initialState, action) => {
    var updatedState = Object.assign({}, state)
	switch(action.type){
		case constants.SOLUTIONS_RECEIVED:
		    console.log('SOLUTIONS_RECEIVED: '+JSON.stringify(action.solutions))
		    updatedState['list'] = action.solutions
		    return updatedState

		case constants.SOLUTION_CREATED:
		    var updatedList = Object.assign([], updatedState.list)  //var updatedList = Object.assign({}, updatedState.list)
		    console.log('SOLUTION_CREATED: '+JSON.stringify(action.solution))
		    updatedList.push(action.solution) 
		    updatedState['list'] = updatedList
		    return updatedState   

		default:
            return state
	}
}