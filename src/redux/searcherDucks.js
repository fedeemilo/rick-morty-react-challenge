import ApolloClient, { gql } from "apollo-boost"
import { onError } from "apollo-link-error"
import { InMemoryCache } from "apollo-cache-inmemory"

// constants
let initialData = {
    display: false,
    array: [],
    search: "",
    filter: "characters",
    fetching: false,
    attribute: "name"
}

let errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
    errorPolicy: "ignore",
})

// query data
let GET_DATA = "GET_DATA"
let GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
let GET_DATA_ERROR = "GET_DATA_ERROR"

// store data
let GET_INPUT = "GET_INPUT"
let GET_ATTRIBUTE = "GET_ATTRIBUTE"
let GET_FILTER = "GET_FILTER"
let GET_DISPLAY = "GET_DISPLAY"

// apollo
let APOLLO_ERROR = 'APOLLO_ERROR'


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
        case GET_FILTER:
            return { ...state, filter: action.payload, fetching: false }
        case GET_DISPLAY:
            return { ...state, display: action.payload, fetching: false }
        default:
            return state
    }
}

// actions

// get data from rick and morty api
export let getDataAction = () => (dispatch, getState) => {
    let filter = getState().search.filter

    // set function of query depending on the selected filter
    let graphFilter = () => {
        switch (filter) {
            case "characters":
                return "FilterCharacter"
            case "locations":
                return "FilterLocation"
            case "episodes":
                return "FilterEpisode"
            default:
                return filter
        }
    }

    // dynamic query
    let query = gql`
        query($filter: ${graphFilter()}) {
            ${filter}(filter: $filter) {
                results {
                    id
                    name
                   ${filter === "characters" ? "image" : ""}
                   ${filter === "locations" ? "dimension" : ""}
                   ${filter === "episodes" ? "episode" : ""}
                }
            }
        }
    `

    dispatch({
        type: GET_DATA,
    })

    // obtain search and attribute from the store
    let { search, attribute } = getState().search
    let obj = {}
    obj[attribute] = search

    return client
        .query({
            query,
            variables: { filter: obj },
        })
        .then(({ data, error }) => {
            if (error) {

                dispatch({
                    type: GET_DATA_ERROR,
                    payload: error,
                })
            }
            dispatch({
                type: GET_DATA_SUCCESS,
                payload: data,
            })
        })
}

// set the search attribute of the state
export let setSearchAction = elem => dispatch => {
    dispatch({
        type: GET_INPUT,
        payload: elem,
    })
}

// set the attribute attr of state
export let setAttributeAction = elem => dispatch => {
    dispatch({
        type: GET_ATTRIBUTE,
        payload: elem,
    })
}

// set the filter
export let setFilterAction = elem => dispatch => {
    dispatch({
        type: GET_FILTER,
        payload: elem,
    })
}

// set display mode of array results
export let setDisplayAction = elem => dispatch => {
    dispatch({
        type: GET_DISPLAY,
        payload: elem,
    })
}

// handle errors
export let errorHandler = (dispatch) => onError((errors) => {
    if (errors.networkError) {
        dispatch({
            type: APOLLO_ERROR,
            payload: 'Sorry! what you are looking for is not found.'
        })
    }
})

