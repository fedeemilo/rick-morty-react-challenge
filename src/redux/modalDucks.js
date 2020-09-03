import ApolloClient, { gql } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"

let initialData = {
    displayChar: false,
    objectId: "",
    objectChar: {},
    objectLocation: {},
    objectEpisode: {},
    fetching: false,
    filter: "character",
}

let URI = "https://rickandmortyapi.com/graphql"

let client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
})

/* constants */

let CHAR = "CHAR"
let CHAR_SUCCESS = "CHAR_SUCCESS"
let CHAR_ERROR = "CHAR_ERROR"
let LOCATION = "LOCATION"
let LOCATION_SUCCESS = "LOCATION_SUCCESS"
let LOCATION_ERROR = "LOCATION_ERROR"
let EPISODE = "EPISODE"
let EPISODE_SUCCESS = "EPISODE_SUCCESS"
let EPISODE_ERROR = "EPISODE_ERROR"
let GET_ID = "GET_ID"
let GET_DISPLAY_CHAR = "GET_DISPLAY_CHAR"
let CLEAN_STATE = "CLEAN_STATE"

/* reducer */
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case CHAR:
            return { ...state, fetching: true }
        case CHAR_SUCCESS:
            return {
                ...state,
                fetching: false,
                objectChar: Object.assign(state.objectChar, action.payload),
            }
        case CHAR_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case LOCATION:
            return { ...state, fetching: true }
        case LOCATION_SUCCESS:
            return {
                ...state,
                fetching: false,
                objectLocation: Object.assign(
                    state.objectLocation,
                    action.payload
                ),
            }
        case LOCATION_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case EPISODE:
            return { ...state, fetching: true }
        case EPISODE_SUCCESS:
            return {
                ...state,
                fetching: false,
                objectEpisode: Object.assign(
                    state.objectEpisode,
                    action.payload
                ),
            }
        case EPISODE_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_ID:
            return { ...state, fetching: false, objectId: action.payload }
        case CLEAN_STATE:
            return {
                ...state,
                objectChar: Object.assign(
                    {},
                    delete state.objectChar.character,
                    state.objectChar
                ),
            }
        case GET_DISPLAY_CHAR:
            return {
                ...state,
                displayChar: action.payload,
                fetching: false,
            }
        default:
            return state
    }
}

/* actions */

// get char data action
export let getCharAction = () => (dispatch, getState) => {
    let ID = getState().modal.objectId

    let query = gql`
        query($entityID: ID!) {
            character(id: $entityID) {
                id
                name
                type
                gender
                species
                image
                status
            }
        }
    `

    dispatch({
        type: CHAR,
    })

    return client
        .query({
            query,
            variables: { entityID: ID },
        })
        .then(({ data }) => {
            dispatch({
                type: CHAR_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            dispatch({
                type: CHAR_ERROR,
                payload: err,
            })
        })
}

// get location data action

export let getLocationAction = () => (dispatch, getState) => {
    let ID = getState().modal.objectId

    let query = gql`
        query($entityID: ID!) {
            location(id: $entityID) {
                name
                type
                dimension
                residents {
                    name
                }
            }
        }
    `

    dispatch({
        type: LOCATION,
    })

    return client
        .query({
            query,
            variables: { entityID: ID },
        })
        .then(({ data }) => {
            dispatch({
                type: LOCATION_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            dispatch({
                type: LOCATION_ERROR,
                payload: err,
            })
        })
}

// get episode data action
export let getEpisodeAction = () => (dispatch, getState) => {
    let ID = getState().modal.objectId

    let query = gql`
        query($entityID: ID!) {
            episode(id: $entityID) {
                name
                air_date
                episode
                characters {
                    name
                }
            }
        }
    `

    dispatch({
        type: EPISODE,
    })

    return client
        .query({
            query,
            variables: { entityID: ID },
        })
        .then(({ data }) => {
            dispatch({
                type: EPISODE_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            dispatch({
                type: EPISODE_ERROR,
                payload: err,
            })
        })
}

export let setObjectIdAction = elem => dispatch => {
    dispatch({
        type: GET_ID,
        payload: elem,
    })
}

export let cleanStateAction = id => dispatch => {
    dispatch({
        type: CLEAN_STATE,
        payload: id,
    })
}

export let setDisplayCharAction = elem => dispatch => {
    dispatch({
        type: GET_DISPLAY_CHAR,
        payload: elem,
    })
}
