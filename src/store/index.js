import { profileReducer, accountReducer, bugReducer } from '../reducers'
import { applyMiddleware, createStore, combineReducers } from 'redux'  //'react-redux'
import thunk from 'redux-thunk'   //{ thunk }

var store;

export default {

    configureStore: () => {  //configureStore = () => {
 
	    const reducers = combineReducers({

	    	profile: profileReducer,
	    	account: accountReducer,
	    	bug: bugReducer

	    }),

	    store = createStore(

	        reducers,
	    	applyMiddleware()  //applyMiddleware(thunk)

	    ) 

        return store
    }, 

    currentStore: () => {
        return store
    }
}