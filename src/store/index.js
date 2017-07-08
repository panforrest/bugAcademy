import { profileReducer, accountReducer, bugReducer, trackReducer, solutionReducer } from '../reducers'
import { applyMiddleware, createStore, combineReducers } from 'redux'  //'react-redux'
import thunk from 'redux-thunk'   //{ thunk }

// var store;

// export default {

//     configureStore: () => {  //configureStore = () => {
 
// 	    const reducers = combineReducers({

// 	    	profile: profileReducer,
// 	    	account: accountReducer,
// 	    	bug: bugReducer,
// 	    	track: trackReducer

// 	    }),

// 	    store = createStore(

// 	        reducers,
// 	    	applyMiddleware()  //applyMiddleware(thunk)

// 	    ) 

//         return store
//     }, 

//     currentStore: () => {
//         return store
//     }
// }

var reducers = combineReducers({
	profile: profileReducer,
	account: accountReducer,
	bug: bugReducer,
	track: trackReducer,
	solution: solutionReducer
})

var store = createStore(
	reducers,
	applyMiddleware(thunk)
)

export default store