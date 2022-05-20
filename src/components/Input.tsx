import { ERROR_MESSAGE } from "../constants";

interface InputProps{
    type : string,
    name : string,
    label : string,
    className : string,
    passData : (fieldName: any, value: any, error: string | undefined) => void,
    placeholder? : string, 
    value : any,
    validation : {func: (any), params: any},
    error : string | undefined
}

export const validateInput  = (value : any, validation : {func: (any), params: any}) : string | undefined => {
    let error;
    if(validation){
        const {func, params} = validation;
        let result = func(value, params);
        if (!result.isValid){
            switch (result.errorMessage){
                case ERROR_MESSAGE.TEXT_EMPTY:
                    error = 'Field is required.';
                    break;
                case ERROR_MESSAGE.TEXT_LENGTH_BAD:
                    error = 'Should be from '+ params.min + ' to ' + params.max + ' character long.';
                    break;
                case ERROR_MESSAGE.TEXT_PATTERN_MISMATCH:
                    error = 'Should match format: ' + result.pattern;
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
            <input className={`form-control ${props.error ? 'error' : ''}`} 
            type={props.type} id={props.name} name={props.name} value={props.value}
            placeholder={`${props.placeholder ? props.placeholder : ''}`} 
            onChange={changeHandler}/>
            {props.error && <small className="form-control__error-text">{props.error}</small>}
        </div>
    );
}

export default Input;