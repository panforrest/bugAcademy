import { profileReducer } from '../reducers'
import { applyMiddleware, createStore, combineReducers } from 'redux'  //'react-redux'
import thunk from 'redux-thunk'   //{ thunk }

var store;

export default {

    configureStore: () => {  //configureStore = () => {
 
	    const reducers = combineReducers({

	    	profile: profileReducer

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