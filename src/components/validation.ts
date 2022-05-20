import { ERROR_MESSAGE } from "../constants";

export const REGEX = {
    email: /^\S+@\S+\.\S+$/
}

export const REGEX_READABLE = {
    [REGEX.email.source]: "example@domain.com"
}

export const stringValidation = (text: string, params:{min?: number, max?: number, pattern?: RegExp}) => {
    let {min, max, pattern} = params;
    let errorMessage = null;
    let readablePattern = null;

    if(pattern) {
        console.log(pattern.test(text))
        if(!pattern.test(text)){
            errorMessage = ERROR_MESSAGE.TEXT_PATTERN_MISMATCH;
            readablePattern = REGEX_READABLE[pattern.source];
        }
    }
    if(max){
        if(text && text.length > max) {
            errorMessage  = ERROR_MESSAGE.TEXT_LENGTH_BAD;
        }
    }
    if(min){
        if (text && text.length > 0) {
            if (text.length < min){
                errorMessage = ERROR_MESSAGE.TEXT_LENGTH_BAD;
            }
        }
        else if (min > 0){
            errorMessage = ERROR_MESSAGE.TEXT_EMPTY;
        }
    }

    return {
        isValid : errorMessage === null,
        errorMessage,
        pattern : readablePattern
    }
}