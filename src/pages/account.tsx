import Input from "../components/Input";
import { REGEX, stringValidation } from "../components/validation";
import { Form, FormField } from "../components/form";
import { User } from "../database/dbTypes";
import { RootState } from "../redux/store/store";
import { sessionActions } from "../redux/actions/sessionActions";
import { Link } from "react-router-dom";
import { useState } from "react";
import { connectAdvanced, useDispatch, useSelector } from "react-redux";

const AccountPage = () => {

    //AccountPage is displayed only when user exists in state
    const user = useSelector((state : RootState) => state.sessionReducer.user as User);
    const message = {success : useSelector((state : RootState) => state.sessionReducer.successMessage),
                    fail: useSelector((state : RootState) => state.sessionReducer.errorMessage)}
    const dispatch = useDispatch();
    const updateUser = (user: User) => sessionActions.updateUser(dispatch, user);

    const [fields, setFields] = useState([
        {
            name: 'firstname',
            value: user.firstname, 
            error: undefined,
            label: "First name", 
            type: 'input',
            validation: {func: stringValidation, params:{min: 1}}
        },
        {
            name: 'lastname', 
            value: user.lastname, 
            error: undefined, 
            label: "Last name", 
            type: 'input',
            validation: {func: stringValidation, params:{min: 1}}
        },
        {   name: 'email',
            value: user.email, 
            error: undefined,
            label: "Email" ,
            type: 'input',
            validation: {func: stringValidation, params:{min: 1, pattern: REGEX.email}}},
    ] as FormField[]);
    const [updateTriggered, setupdateTriggered] = useState(false);

    const getData = (fieldName: any, value: any, error: string | undefined) => {
        setFields((prevFields) => {
            return prevFields.map((field) => {
                    if(field.name === fieldName){
                        field.value = value;
                        field.error = error;
                    }
                    return field;
                });
        });
    }

    const submitHandler = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let dataHasError = Form.findField(fields, 'error', undefined, false) ? true : false;
        if(!dataHasError) {
            if(Form.findField(fields, 'value', "")){
                setFields(Form.validateFields(fields));
            }
            else{
                let updatedUser = {...user}
                for (let fieldname of Object.keys(user)){
                    let field = Form.findField(fields, 'name', fieldname);
                    if (field) {
                        updatedUser[fieldname as keyof User] = field.value;
                    }
                }
                if (JSON.stringify(user) !== JSON.stringify(updatedUser)){
                    updateUser(updatedUser);
                    setupdateTriggered(true);
                }
            }
        } else{
            setupdateTriggered(false);
        }
    }

    return(
        <div>
            <h2>Your Account</h2>
            <p className="message">
                Modify website's content at <Link to='/'>Homepage</Link>.
            </p>
            {updateTriggered && message.success && <p className="message message--success">Data updated successfully.</p>}
            {updateTriggered && message.fail && <p className="message message--error">Data update ended with fail.</p>}
            <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <h3>Change personal data</h3>
                    <form className="form" onSubmit={submitHandler}>
                        {fields.map((field) => 
                            <Input key={field.name}
                            type={field.type}
                            name={field.name}
                            label={field.label}
                            value = {field.value}
                            className = ""
                            passData={getData}
                            validation = {field.validation}
                            error = {field.error}
                            />
                        )}
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

export default AccountPage;