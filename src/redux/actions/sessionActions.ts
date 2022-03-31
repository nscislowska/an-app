import { users } from "../../database/db";
import { User } from "../../database/dbTypes";
import { LOGIN_FALIURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, UPDATE_USER } from "./sessionActionsTypes"

const loginSuccess = (user : User) => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginFailure = (errorMessage : string) => {
    return {
        type: LOGIN_FALIURE,
        user: null,
        errorMessage
    };
};

const loginRequest = (user : User | undefined) => {
    return {
        type: LOGIN_REQUEST,
        user
    };
};

const login = (username: string, password: string) => {
    let action;
    let user = users.find(user => user.username === username);
    if (user && user.password === password){
        localStorage.setItem("user", JSON.stringify(user));
        action = loginSuccess(user);
    } else {
        action = loginFailure("Incorrect login or password.");
    }
    
    return action;
}

const logout = () => {
    localStorage.removeItem("user");
    return {
        type: LOGOUT,
        user: null
    }
}

const updateUser = (user : User) => {
    localStorage.setItem("user", JSON.stringify(user));
    return {
        type: UPDATE_USER,
        user
    }
}


export const sessionActions = {
    login,
    logout,
    updateUser
};