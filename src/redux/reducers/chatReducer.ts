
import { db } from "../../utils/firebase";
import { SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE, UPDATE_MESSAGES } from "../actions/chatActionsTypes"
import { ChatAction } from "../actions/chatActions"
import { ChatMessage } from "../../utils/dbTypes";
import { onSnapshot } from "firebase/firestore";

interface chatReducerState{
    messages: ChatMessage[],
    errorMessage?: string,
    successMessage?: string
}

const getInitialState = async () => {   
    const messages = await db.chat.get();
    return {
        messages
    }
}

let initialState: chatReducerState;
try {
    initialState = await getInitialState();
}
catch(e){
    console.log('get initial chat state error:', e);
}

export const chatReducer = (state : chatReducerState = initialState, action : ChatAction) : chatReducerState => {
    switch (action.type) {
        case SEND_MESSAGE_SUCCESS:
            return {
                messages: action.message ? [...state.messages, action.message] : state.messages,
                successMessage: action.successMessage
            }
        case SEND_MESSAGE_FAILURE:
            return {
                messages: state.messages,
                errorMessage: action.errorMessage
            }
        case UPDATE_MESSAGES:
            return {
                messages: action.messages ? action.messages : state.messages
            }
        default: return state;
    }
}