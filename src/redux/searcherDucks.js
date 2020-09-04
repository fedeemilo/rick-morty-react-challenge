import ApolloClient, { gql } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"

// constants
let initialData = {
    display: false,
    object: [],
    search: "",
    filter: "characters",
    fetching: false,
    attribute: "name",
    reset: false,
    newPage: 1,
}

let URI = "https://rickandmortyapi.com/graphql"

let client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
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
let GET_RESET = "GET_RESET"

// obtain new page 
let NEW_PAGE = "ITEM_PAGE"

// clean store
let CLEAN_STATE = "CLEAN_STATE"

// reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_DATA:
            return { ...state, fetching: true }
        case GET_DATA_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_DATA_SUCCESS:
            return { ...state, object: action.payload, fetching: false }
        case GET_INPUT:
            return { ...state, search: action.payload, fetching: false }
        case GET_ATTRIBUTE:
            return { ...state, attribute: action.payload, fetching: false }
        case GET_FILTER:
            return { ...state, filter: action.payload, fetching: false }
        case GET_DISPLAY:
            return { ...state, display: action.payload, fetching: false }
        case GET_RESET:
            return { ...state, reset: action.payload, fetching: false }
        case CLEAN_STATE:
            return { ...state, object: {} }
        case NEW_PAGE:
            return { ...state, newPage: action.payload }
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
        query($filter: ${graphFilter()}, $page: Int) {
            ${filter}(filter: $filter, page: $page) {
                info {
                    pages
                    next
                    prev
                }
                results {
                    id
                    name
                   ${filter === "characters" ? "species" : ""}
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

    // obtain search, attribute and newPage from the store
    let { search, attribute, newPage } = getState().search
    let obj = {}
    obj[attribute] = search

    return client
        .query({
            query,
            variables: { filter: obj, page: newPage },
        })
        .then(({ data }) => {
            localStorage.search = JSON.stringify(data)
            dispatch({
                type: GET_DATA_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_DATA_ERROR,
                payload: err,
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

// set the reset of the search
export let setResetAction = elem => dispatch => {
    dispatch({
        type: GET_RESET,
        payload: elem,
    })
}

// clean the state
export let cleanStateAction = () => dispatch => {
    dispatch({
        type: CLEAN_STATE,
    })
}

// go to the number page selected
export let itemPageAction = elem => (dispatch, getState) => {
    dispatch({
        type: NEW_PAGE,
        payload: elem,
    })

    getDataAction()(dispatch, getState)
}
