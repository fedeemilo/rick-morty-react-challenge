import ApolloClient, { gql } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"

let initialData = {
    display: false,
    objectId: "",
    object: {},
    fetching: false,
    filter: "",
}

let URI = "https://rickandmortyapi.com/graphql"

let client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
})

/* constants */

// query data
let MODAL_DATA = "GET_DATA"
let MODAL_DATA_SUCCESS = "GET_DATA_SUCCESS"
let MODAL_DATA_ERROR = "GET_DATA_ERROR"
let GET_ID = 'GET_ID'
let CLEAN_STATE = 'CLEAN_STATE'

/* reducer */
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case MODAL_DATA:
            return { ...state, fetching: true }
        case MODAL_DATA_SUCCESS:
            return {
                ...state,
                fetching: false,
                object: Object.assign(state.object, action.payload),
            }
        case MODAL_DATA_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_ID:
            return {...state, fetching: false, objectId: action.payload}
        case CLEAN_STATE:
            return {...state, object: Object.assign(state.object, initialData.object)}
        default:
            return state
    }
}

/* actions */

// get data action
export let getModalDataAction = () => (dispatch, getState) => {
    let ID = getState().modal.objectId

    // set query depending on filter selected
    // let selectQuery = () => {
    //     switch (filter) {
    //         case "characters":
    //             return gql`
    //                 query getCharacterById($ID: ID!) {
    //                     character(id: $ID) {
    //                         name
    //                         type
    //                         gender
    //                         species
    //                         image
    //                     }
    //                 }
    //             `
    //         case "locations":
    //             return gql`
    //                 query getLocationById($ID: ID!) {
    //                     location(id: $ID) {
    //                         name
    //                         type
    //                         dimension
    //                         residents {
    //                             name
    //                         }
    //                     }
    //                 }
    //             `
    //         case "episodes":
    //             return gql`
    //                 query getEpisodeById($ID: ID!) {
    //                     episode(id: $ID) {
    //                         name
    //                         air_date
    //                         episode
    //                         characters {
    //                             name
    //                         }
    //                     }
    //                 }
    //             `
    //     }
    // }

    let query = gql`
        query($entityID: ID!) {
            character(id: $entityID) {
                name
                type
                gender
                species 
                image            
            }
        }
    `
    dispatch({
        type: MODAL_DATA,
    })

    return client
        .query({
            query,
            variables: { entityID: ID },
        })
        .then(({ data }) => {
            dispatch({
                type: MODAL_DATA_SUCCESS,
                payload: data,
            })
        })
        .catch(err => {
            dispatch({
                type: MODAL_DATA_ERROR,
                payload: err,
            })
        })
}

export let setObjectIdAction = elem => (dispatch) => {

    dispatch({
        type: GET_ID,
        payload: elem
    })

}

export let cleanStateAction = () => dispatch => {
    dispatch({
        type: CLEAN_STATE
    })
}