import ApolloClient, { gql } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"

let initialData = {
    displayChar: false,
    displayLocation: false,
    displayEpisode: false,
    objectId: "",
    objectChar: {},
    objectLocation: {},
    objectEpisode: {},
    fetching: false,
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
let GET_DISPLAY_LOCATION = "GET_DISPLAY_LOCATION"
let GET_DISPLAY_EPISODE = "GET_DISPLAY_EPISODE"
let CLEAN_CHAR = "CLEAN_CHAR"
let CLEAN_LOCATION = "CLEAN_LOCATION"
let CLEAN_EPISODE = "CLEAN_EPISODE"

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
        case CLEAN_CHAR:
            return {
                ...state,
                objectChar: Object.assign(
                    {},
                    delete state.objectChar.character,
                    state.objectChar
                ),
            }
        case CLEAN_LOCATION:
            return {
                ...state,
                objectLocation: Object.assign(
                    {},
                    delete state.objectLocation.location,
                    state.objectLocation
                ),
            }
        case CLEAN_EPISODE:
            return {
                ...state,
                objectEpisode: Object.assign(
                    {},
                    delete state.objectEpisode.episode,
                    state.objectEpisode
                ),
            }
        case GET_DISPLAY_CHAR:
            return {
                ...state,
                displayChar: action.payload,
                fetching: false,
            }
        case GET_DISPLAY_LOCATION:
            return {
                ...state,
                displayLocation: action.payload,
                fetching: false,
            }
        case GET_DISPLAY_EPISODE:
            return {
                ...state,
                displayEpisode: action.payload,
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
                    image
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
                    image
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

// set the id of the card selected action
export let setObjectIdAction = elem => dispatch => {
    dispatch({
        type: GET_ID,
        payload: elem,
    })
}

// clean char action
export let cleanCharAction = id => dispatch => {
    dispatch({
        type: CLEAN_CHAR,
        payload: id,
    })
}

// clean location action
export let cleanLocationAction = id => dispatch => {
    dispatch({
        type: CLEAN_LOCATION,
        payload: id,
    })
}

// clean episode action
export let cleanEpisodeAction = id => dispatch => {
    dispatch({
        type: CLEAN_EPISODE,
        payload: id,
    })
}

// set display of CHAR modal action
export let setDisplayCharAction = elem => dispatch => {
    dispatch({
        type: GET_DISPLAY_CHAR,
        payload: elem,
    })
}

// set display of LOCATION modal action
export let setDisplayLocationAction = elem => dispatch => {
    dispatch({
        type: GET_DISPLAY_LOCATION,
        payload: elem,
    })
}

// set display of EPISODE modal action
export let setDisplayEpisodeAction = elem => dispatch => {
    dispatch({
        type: GET_DISPLAY_EPISODE,
        payload: elem,
    })
}
