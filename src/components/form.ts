import { Dispatch, SetStateAction } from "react";
import { validateInput } from "./Input";

interface StringObjectKeys {
    [key: string]: any
}

export interface FormField extends StringObjectKeys {
    name: string,
    type: string,
    error?: string,
    label: string,
    validation: {func: Function, params: object},
    value: string
}

const findField = (fields: FormField[], 
    property: string, 
    value: string | number | undefined, 
    equal: boolean = true) : FormField | undefined => {
return equal ? fields.find((field) => Object.keys(field).includes(property) && field[property]  === value)
  : fields.find((field) => Object.keys(field).includes(property) && field[property]  !== value);
}

//validate each field and save error as property
const validateFields = (fields: FormField[]) : FormField[] => {
    return fields.map((field) => {
            let error;
            switch (field.type){
                case 'input':
                    error = validateInput(field.value, field.validation);
                    break;
            }
            field.error = error;
            return field;
        }
    );
}

//data passing function generator
const passDataFromFieldToForm = (setFields: Dispatch<SetStateAction<FormField[]>>) 
                                : (fieldName: any, value: any, error: string | undefined) => void => {
    return (fieldName: any, value: any, error: string | undefined) => {
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
}

//validate fields and execute callback
const submitHandler = (event: React.FormEvent<HTMLFormElement>, 
                       fields: FormField[], 
                       setFields: Dispatch<SetStateAction<FormField[]>>, 
                       callback: (fields: FormField[]) => void) : boolean | void => {
    event.preventDefault();
    let allValid = findField(fields, 'error', undefined, false) ? false : true;
    if (allValid) {
        if (findField(fields, 'value', "")) {
            setFields(validateFields(fields));
        }
        else {
            callback(fields);
            return true;
        }
    }
    else {
        return false;
    }
}

export const Form = {validateFields, findField, submitHandler, passDataFromFieldToForm};
