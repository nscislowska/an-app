import { User } from "../../database/dbTypes"
import { LOGIN_FALIURE, LOGIN_SUCCESS, LOGOUT, UPDATE_USER } from "../actions/sessionActionsTypes"

interface sessionReducerState{
    isLoggedIn: boolean,
    user: User | null,
    errorMessage? : string
}

const getStateFromStorage = () : sessionReducerState => {   
    let localUser = localStorage.getItem('user');
    console.log(localUser)
    return{
        isLoggedIn: localUser !== null,
        user: localUser ? JSON.parse(localUser) as User : null
    }
}
const initialState = getStateFromStorage();

const getState = (user: User | null) => {
    return{
        isLoggedIn: user !== null,
        user: user
    }
}

export const sessionReducer = (state : sessionReducerState = initialState, 
                               action : {type: string, user: User | null, errorMessage?: string
}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...getState(action.user)
            }
        case LOGIN_FALIURE:
            return {
                ...getState(action.user),
                errorMessage: action.errorMessage
            }
        case LOGOUT:
            return {
                ...getState(action.user)
            }
        case UPDATE_USER:
            return {
                ...getState(action.user)
            }
        default: return state;
    }
}