import { User } from "../../database/dbTypes"
import { LOGIN_FALIURE, LOGIN_SUCCESS, LOGOUT, UPDATE_USER } from "../actions/sessionActionsTypes"

interface sessionReducerState{
    isLoggedIn: boolean,
    user: User | null
}
const initialState = {
    isLoggedIn: false,
    user: null
}

export const sessionReducer = (state : sessionReducerState = initialState, action : {type: string, user: User}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true, 
                user: action.user
            }
        case LOGIN_FALIURE:
            return initialState
            
        case LOGOUT:
            return initialState

        case UPDATE_USER:
                return {
                    ...state,
                    user: action.user
                }

        default: return state;
    }
}