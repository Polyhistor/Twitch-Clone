import { SIGN_IN, SIGN_OUT } from '../actions/types'

// initializing a state value, because that's a must in Redux
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            // here we make sure that once user is logged in, we change our 'isSignedin' in the store to true, and we also pass the user ID!
            return { ...state, isSignedIn: true, userId: action.payload }
        case SIGN_OUT:
            // we make sure that once user logs out, we mark 'isSignedin' to false, and we clear the user ID.
            return { ...state, isSignedIn: false, userId: null }
        default:
            return state
    }
}