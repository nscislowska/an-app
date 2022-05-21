import { ChatMessage } from "../../utils/dbTypes"
import { SEND_MESSAGE_FAILURE, SEND_MESSAGE_SUCCESS, UPDATE_MESSAGES } from "./chatActionsTypes"
import { Action } from "./Action"

export interface ChatAction extends Action {
    message?: ChatMessage,
    messages?: ChatMessage[]
}

const sendSuccess = (message: ChatMessage) : ChatAction => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        message,
        successMessage: 'Message sent successfully',
    }
}

const sendFailure = (errorMessage: string) : ChatAction => {
    return {
        type: SEND_MESSAGE_FAILURE,
        errorMessage
    }
}

const updateMessages = (messages: ChatMessage[]) : ChatAction => {
    return {
        type: UPDATE_MESSAGES,
        messages
    }
}

export const ChatActions = {
    updateMessages,
    sendFailure,
    sendSuccess
}