import { ERROR_MESSAGE } from "../constants";

interface InputProps{
    type : string,
    name : string,
    label : string,
    className : string,
    passData : (fieldName: any, value: any, error: InputError) => void,
    placeholder? : string, 
    value : any,
    validation : {func: (any), params: any},
    error : InputError
}

export interface InputError{
    state: boolean,
    message: string
}

const noError = {state: false, message:""};

export const validateInput  = (value : any, validation : {func: (any), params: any}) => {
    let error = noError;
    if(validation){
        const {func, params} = validation;
        let result = func(value, params);
        if (!result.isValid){
            switch (result.errorMessage){
                case ERROR_MESSAGE.TEXT_EMPTY:
                    error = {state: true, message: 'Field is required.'};
                    break;
                case ERROR_MESSAGE.TEXT_LENGTH_BAD:
                    error = {state: true, message: 'Should be from '+ params.min + ' to ' + params.max + ' character long.'};
                    break;
                case ERROR_MESSAGE.TEXT_PATTERN_MISMATCH:
                    error = {state: true, message: 'Should match format: ' + result.pattern};
                    break;
            }
        } 
    }
    return error;
}

function Input (props: InputProps){

    const changeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        let error = validateInput(value, props.validation);
        props.passData(props.name, value, error);
    }

    return(
        <div className={`input-group ${props.className}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <input className={`form-control ${props.error.state ? 'error' : ''}`} 
            type={props.type} id={props.name} name={props.name} value={props.value}
            placeholder={`${props.placeholder ? props.placeholder : ''}`} 
            onChange={changeHandler}/>
            {props.error.state && <small className="form-control__error-text">{props.error.message}</small>}
        </div>
    );
}

export default Input;