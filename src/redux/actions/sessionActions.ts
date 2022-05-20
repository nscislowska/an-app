import { User } from "../../database/dbTypes";
import { users } from "../../utils/firebase";
import { AppDispatch } from "../store/store";
import { LOGIN_FALIURE, LOGIN_SUCCESS, LOGOUT, USER_UPDATE_FAILURE, USER_UPDATE_SUCCESS } from "./sessionActionsTypes"

interface Action{
    type: string,
    user?: User,
    errorMessage?: string,
    successMessage?: string
}

const updateSuccess = (user : User) : Action => {
    return {
        type: USER_UPDATE_SUCCESS,
        user,
        successMessage: 'Data updated sucessfully'
    }
}

const updateFailure = (errorMessage: string) : Action => {
    return {
        type: USER_UPDATE_FAILURE,
        errorMessage
    }
}

const loginSuccess = (user : User) : Action => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginFailure = (errorMessage : string) : Action => {
    return {
        type: LOGIN_FALIURE,
        errorMessage
    };
};

const logout = () => {
    localStorage.removeItem("username");
    return {
        type: LOGOUT
    }
}

const login = async (dispatch: AppDispatch, username: string, password: string) => {
    let action = loginFailure("An errror has occured.");
    await users.get(username).then((user : User | undefined) => {
        if (user && user.password === password) {
            localStorage.setItem("username", JSON.stringify(user.username));
            action = loginSuccess(user);
        }
        else {
            action = loginFailure("Incorrect login or password.");
        }
    }).catch((e) => {
        action = loginFailure("An errror has occured.");
    });

    dispatch(action);
}

const updateUser = (dispatch: AppDispatch, user: User) => {
    console.log('updating user data')
    users.update(user)
         .then(() => {
            localStorage.setItem("username", JSON.stringify(user.username));
            dispatch(updateSuccess(user));
         })
         .catch((e) => {
            dispatch(updateFailure("Data update failed."));
         });
}

export type {Action};
export const sessionActions = {
    login,
    logout : (dispatch: AppDispatch) => dispatch(logout()),
    updateUser
};