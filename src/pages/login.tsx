import React, { Component } from "react";
import { connect } from "react-redux";
import Input, { InputError, validateInput } from "../components/Input";
import { stringValidation } from "../components/validation";
import { sessionActions } from "../redux/actions/sessionActions";
import { RootState } from "../redux/store/store";

class LoginPage extends Component<any, any> {

    loginFailMessage = "Incorrect login or password.";
    usernameEmptyMessage = "Login is required.";
    passwordEmptyMessage = "Password is required.";

    constructor(props: any) {
        super(props);
        this.state = {
            fields : {
                username : {value: "", error: {state: false, message: ''}, 
                    validation: {func: stringValidation, params:{min: 1}}},
                password : {value: "", error: {state: false, message: ''}, 
                    validation: {func: stringValidation, params:{min: 1}}},
            },
            loginError : {state: false, message: this.loginFailMessage},
        }

        this.submitHandler = this.submitHandler.bind(this);
        this.getData = this.getData.bind(this);
        this.field = this.field.bind(this);
        this.fieldExists = this.fieldExists.bind(this);
        this.validateAll = this.validateAll.bind(this);
    }

    getData(fieldName: any, value: any, error: InputError){
        this.setState((state:any)=>{
            let fields = state.fields;
            let field = fields[fieldName];
            field.value = value;
            field.error = error;
            fields[fieldName] = field;
            return {fields};
        });
    }

    field(fieldName: string){
        return this.state.fields[fieldName];
    }

    fieldExists(property: string, value: any, property2?:string) : boolean{
        if (property2) {
            return Object.keys(this.state.fields).some(fieldName => this.field(fieldName)[property][property2] === value);
        } 
        else {
            return Object.keys(this.state.fields).some(fieldName => this.field(fieldName)[property] === value);
        }
    }

    validateAll(){
        let fields : {[key: string] : any} = {};
        for(let fieldName of Object.keys(this.state.fields)){
            let field = this.field(fieldName);
            let error = validateInput(field.value, field.validation);
            field.error = error;
            fields[fieldName] = field;
        }
        this.setState({fields});
    }

    submitHandler(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let dataHasError = this.fieldExists('error',true, 'state');
        if(!dataHasError) {
            if(this.fieldExists('value', "")){
                this.validateAll();
            }
            else{
                this.props.login(this.field('username').value, this.field('password').value);
                if(!this.props.isLoggedIn){
                    this.setState({loginError : {state: true, message: this.loginFailMessage}});
                }
            }
        }
    }

    render(){
        return(
            <div>
            <h2>Login</h2>
            <p className="message">Available with credentials: <i>mylogin, mypassword</i>.</p>
            {this.state.loginError.state && <p className="message error">{this.state.loginError.message}</p>}
            <form className="form col-lg-5 col-md-5 col-sm-12" onSubmit={this.submitHandler}>
                <Input 
                    type="input"
                    name="username"
                    label="Login"
                    value = {this.state.fields.username.value}
                    className = ""
                    passData={this.getData}
                    validation = {this.field('username').validation}
                    error = {this.state.fields.username.error}
                    />
                <Input 
                    type="password"
                    name="password"
                    label="Password"
                    value= {this.state.fields.password.value}
                    className = ""
                    passData={this.getData}
                    validation = {{func: stringValidation, params:{min: 1}}}
                    error = {this.state.fields.password.error}
                    />
                <button className="button form__control" type='submit'>Login</button>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state : RootState) => {
    return {
        isLoggedIn: state.sessionReducer.isLoggedIn
    }
  }

const mapDispatchToProps = (dispatch : Function) => {
    return {
        login: (username:string, password:string) => dispatch(sessionActions.login(username, password))
    }
  }
  
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginPage);