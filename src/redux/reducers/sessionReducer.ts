import { User } from "../../database/dbTypes"
import { users } from "../../utils/firebase";
import { Action } from "../actions/sessionActions";
import { LOGIN_FALIURE, LOGIN_SUCCESS, LOGOUT, USER_UPDATE_FAILURE, USER_UPDATE_SUCCESS } from "../actions/sessionActionsTypes"

interface sessionReducerState{
    isLoggedIn: boolean,
    user?: User,
    errorMessage?: string,
    successMessage?: string
}

const getStateFromStorage = async () => {   
    let sessionUsername = localStorage.getItem('username')?.replace(/^"(.*)"$/, '$1');;
    let user: User|undefined;
    if (sessionUsername){
        user = await users.get(sessionUsername);
    }
    return {
        isLoggedIn: user !== undefined,
        user
    }
}

const getState = (user: User | undefined) => {
    return{
        isLoggedIn: user !== undefined,
        user: user
    }
}

let initialState: sessionReducerState;
try {
    initialState = await getStateFromStorage();
}
catch(e){
    console.log('getStateFromStorage error:', e);
}

export const sessionReducer = (state : sessionReducerState = initialState, action : Action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(action.user);
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
        case USER_UPDATE_SUCCESS:
            return {
                ...getState(action.user),
                successMessage: action.successMessage
            }
        case USER_UPDATE_FAILURE:
            return {
                ...getState(action.user),
                errorMessage: action.errorMessage
            }
        default: return state;
    }
}