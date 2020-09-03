import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import searchReducer, { getDataAction } from './searcherDucks'
import modalReducer from './modalDucks'

let rootReducer = combineReducers({
	search: searchReducer,
	modal: modalReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
	// creación del Store 
	let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

	// action executions
	getDataAction()(store.dispatch, store.getState)

	return store
}
