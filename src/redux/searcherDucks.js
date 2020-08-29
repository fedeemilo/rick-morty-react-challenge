import { updateDB, getFavs } from '../firebase'
import ApolloClient, { gql } from 'apollo-boost'

// constants

let initialData = {
	display: false,
	array: [],
	search: '',
	filter: 'characters',
	fetching: false,
	attribute: 'name'
}

let client = new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql'
})

let GET_DATA = 'GET_DATA'
let GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
let GET_DATA_ERROR = 'GET_DATA_ERROR'

let GET_INPUT = 'GET_INPUT'
let GET_ATTRIBUTE = 'GET_ATTRIBUTE'

// reducer
export default function reducer(state = initialData, action) {
	switch (action.type) {
		case GET_DATA:
			return { ...state, fetching: true }
		case GET_DATA_ERROR:
			return { ...state, fetching: false, error: action.payload }
		case GET_DATA_SUCCESS:
			return { ...state, array: action.payload, fetching: false }
		case GET_INPUT:
			return { ...state, search: action.payload, fetching: false }
		case GET_ATTRIBUTE:
			return { ...state, attribute: action.payload, fetching: false }
		default:
			return state
	}
}

// BÙSUQEDA EPISODIOS

// query($filter: FilterEpisode){
// 	episodes(filter: $filter) {
// 	  results {
// 		id
// 		name
// 	  }
// 	}
//   }

// BUSQUEDA PERSONAJE
// query($filter: FilterCharacter) {
// 	characters(filter: $filter) {
// 	  results {
// 		id
// 		name
// 		image
// 	  }
// 	}
//   }

// actions

// get data from rick and morty api
export let getDataAction = () => (dispatch, getState) => {
	let query = gql`
		query($filter: FilterLocation) {
			locations(filter: $filter) {
				results {
					name
				}
			}
		}
	`

	dispatch({
		type: GET_DATA
	})

	let { search, attribute } = getState().search
	let obj = {}
	obj[attribute] = search
	console.log(obj)

	return client
		.query({
			query,
			variables: { filter: obj }
		})
		.then(({ data, error }) => {
			if (error) {
				dispatch({
					type: GET_DATA_ERROR,
					payload: error
				})
			}
			dispatch({
				type: GET_DATA_SUCCESS,
				payload: data
			})
		})
}

// set the search attribute of the state
export let setSearchAction = (elem) => (dispatch) => {
	dispatch({
		type: GET_INPUT,
		payload: elem
	})
}

// set the attribute attr of state
export let setAttributeAction = (elem) => (dispatch) => {
	dispatch({
		type: GET_ATTRIBUTE,
		payload: elem
	})
}
