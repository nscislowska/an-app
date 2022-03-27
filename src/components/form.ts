import { InputError } from "./Input";

export interface FormField{
    value: any,
    label: string,
    validation: {func: (any), params: any},
    error: InputError
}
