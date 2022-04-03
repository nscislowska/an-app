import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input, { InputError, validateInput } from "../components/Input";
import { stringValidation } from "../components/validation";
import { sessionActions } from "../redux/actions/sessionActions";
import { RootState } from "../redux/store/store";

//TO DO: loginFailMessage disappears with field error

const LoginPage = () => {

    const initFields : {[key : string] : any}[] = [
        {name: "username", type: "input", value: "", error: {state: false, message: ''}, 
            label: 'Login', validation: {func: stringValidation, params:{min: 1}}},
        {name: "password", type: "password", value: "", error: {state: false, message: ''}, 
        label: 'Password', validation: {func: stringValidation, params:{min: 1}}},
        ];
    const [fields, setFields] = useState(initFields);
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state : RootState) => state.sessionReducer.isLoggedIn);
    const loginFailMessage = useSelector((state : RootState) => state.sessionReducer.errorMessage);
    const dispatch = useDispatch();
    const login = (username:string, password:string) => {
        dispatch(sessionActions.login(username, password));
    }

    const getField = (name : string, property? : string) : any => {
        let field = fields.find((field) => field.name === name);
        return field ? (property ? field[property] : field) : null;
    }

    const updateField = (fieldName: string, value: any, error: InputError) => {
        let index = fields.findIndex((field)=> field.name === fieldName);
        fields[index].value = value;
        fields[index].error = error;
        setFields([...fields]);
    }

    const validateAll = () => {
        for(let i in fields){
            let error = validateInput(fields[i].value, fields[i].validation);
            fields[i].error = error;
        }
        setFields([...fields]);
    }

    const submitHandler = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateAll();
        let dataHasError = fields.some(field => field.error.state);
        if(!dataHasError) {
            login(getField('username', 'value'), getField('password', 'value'));
        }
    }
        
    useEffect(() => {
        // go back to previous page
        if (isLoggedIn) navigate(-1);
    }, [isLoggedIn]);

    return(
            <div>
            <h2>Login</h2>
            <p className="message">Available with credentials: <i>mylogin, mypassword</i>.</p>
            {loginFailMessage && <p className="message message--error">{loginFailMessage}</p>}
            <div className="row">
                <form className="form col-lg-5 col-md-5 col-sm-12" onSubmit={submitHandler}>
                    {fields.map((field) => {
                        return <Input 
                                type={field.type}
                                key = {field.name}
                                name={field.name}
                                label={field.label}
                                value = {field.value}
                                className = ""
                                passData={updateField}
                                validation = {field.validation}
                                error = {field.error}
                                />
                    })}
                    <button className="button form__control" type='submit'>Login</button>
                </form>
            </div>
            </div>
    );
}

export default LoginPage;
