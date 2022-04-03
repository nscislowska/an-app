import { Component, ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import Input, { InputError, validateInput } from "../components/Input";
import { REGEX, stringValidation } from "../components/validation";
import { FormField } from "../components/form";
import { User } from "../database/dbTypes";
import { RootState } from "../redux/store/store";
import { sessionActions } from "../redux/actions/sessionActions";
import { Link } from "react-router-dom";

const mapStateToProps = (state : RootState) => {
    return {
        user: state.sessionReducer.user as User
    }
  }

const mapDispatchToProps = (dispatch : Function) => {
    return {
        updateUser: (user : User) => dispatch(sessionActions.updateUser(user)),
        logout: () => dispatch(sessionActions.logout())
    }
  }
  
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  }

class AccountPage extends Component<Props, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            fields : {
                firstname : {value: this.props.user.firstname, error: {state: false, message: ''},
                    label: "First name",
                    validation: {func: stringValidation, params:{min: 1}}},
                lastname : {value: this.props.user.lastname, error: {state: false, message: ''}, 
                    label: "Last name",
                    validation: {func: stringValidation, params:{min: 1}}},
                email : {value: this.props.user.email, error: {state: false, message: ''},
                    label: "Email" ,
                    validation: {func: stringValidation, params:{min: 1, pattern: REGEX.email}}},
            },
            userUpdateSuccess : false,
            userUpdateFail : false
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
                let updatedUser = this.props.user;
                updatedUser.firstname = this.field('firstname').value;
                updatedUser.lastname = this.field('lastname').value;
                updatedUser.email = this.field('email').value;
                this.props.updateUser(updatedUser);
                let userUpdated = this.props.user.firstname === updatedUser.firstname;
                this.setState({userUpdateSuccess: userUpdated, userUpdateFail: !userUpdated});
            }
        } else{
            this.setState({userUpdateSuccess: false, userUpdateFail: false});
        }
    }

    render(): ReactNode {
        let personalDataInput = [];
        for (let [fieldName, value] of Object.entries(this.state.fields)) {
            let field : FormField = value as FormField;
            personalDataInput.push(<Input key={fieldName}
                                    type="input"
                                    name={fieldName}
                                    label={field.label}
                                    value = {field.value}
                                    className = ""
                                    passData={this.getData}
                                    validation = {field.validation}
                                    error = {field.error}
                                    />);
        }
        return(
            <div>
                <h2>Your Account</h2>
                <p className="message">
                    Change the first name and go back to <Link to='/'>Homepage</Link>.
                    </p>
                <p className="message">    
                    Changes are not permement - data will reset after refreshing this site. 
                    </p>
                {this.state.userUpdateSuccess && <p className="message message--success">Data updated successfully.</p>}
                {this.state.userUpdateFail && <p className="message message--error">Data update ended with fail.</p>}
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <h3>Change personal data</h3>
                        <form className="form" onSubmit={this.submitHandler}>
                        {personalDataInput}
                            <button className="button form__control" type='submit'>Update</button>
                        </form>
                    </div>
                    {/* <div className="col-sm-12 col-md-4 col-lg-4">
                        <h3>Other Actions</h3>
                        <button className="button" onClick={this.props.logout}>Log out</button>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default connector(AccountPage);