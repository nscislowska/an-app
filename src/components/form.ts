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

const findField = (fields: FormField[], property: string, value: string | number | undefined, equal: boolean = true) : FormField | undefined => {
    return equal ? fields.find((field) => Object.keys(field).includes(property) && field[property]  === value)
                 : fields.find((field) => Object.keys(field).includes(property) && field[property]  !== value);
}

export const Form = {validateFields, findField};
