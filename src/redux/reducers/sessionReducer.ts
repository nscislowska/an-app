import { User } from "../../utils/dbTypes"
import { db } from "../../utils/firebase";
import { SesstionAction } from "../actions/sessionActions";
import { LOGIN_FALIURE, LOGIN_SUCCESS, LOGOUT, USER_UPDATE_FAILURE, USER_UPDATE_SUCCESS } from "../actions/sessionActionsTypes"

interface sessionReducerState{
    isLoggedIn: boolean,
    user: User,
    errorMessage?: string,
    successMessage?: string
}

const GuestUser = () : User => {
    return {
        username: 'Guest_' + Math.floor(Math.random() * (99999999 - 1 + 1)) + 1,
        password: '',
        firstname: '',
        lastname: '',
        email: ''
    }
}

const getInitialState = async () => {   
    let sessionUsername = localStorage.getItem('username')?.replace(/^"(.*)"$/, '$1');;
    let user : User | undefined = sessionUsername ? await db.users.get(sessionUsername) 
                                                  : undefined;                        
    return {
        isLoggedIn: user !== undefined,
        user: user ? user : GuestUser()
    }
}

let initialState: sessionReducerState;
try {
    initialState = await getInitialState();
}
catch(e){
    console.log('get inital session state error:', e);
}

export const sessionReducer = (state : sessionReducerState = initialState, action : SesstionAction) : sessionReducerState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(action.user);
            return {
                isLoggedIn: true,
                user: action.user as User
            }
        case LOGIN_FALIURE:
            return {
                isLoggedIn: false,
                user: state.user
            }
        case LOGOUT:
            return {
                isLoggedIn: false,
                user: GuestUser()
            }
        case USER_UPDATE_SUCCESS:
            return {
                isLoggedIn: state.isLoggedIn,
                user: action.user as User,
                successMessage: action.successMessage
            }
        case USER_UPDATE_FAILURE:
            return {
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                errorMessage: action.errorMessage
            }
        default: return state;
    }
}