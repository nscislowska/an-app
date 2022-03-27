interface SelectProps{
    name : string,
    label : string,
    className : {container: string,
                label: string,
                select: string},
    onChange : (React.ChangeEventHandler<HTMLSelectElement>),
    value : any,
    options : SelectOption[]
}

export interface SelectOption{
    id: string, 
    name: string
}

function Select(props: SelectProps){
    return(
        <div className={props.className.container}>
            <label className={props.className.label} htmlFor={props.name}>{props.label}</label>
            <select className={props.className.select} id={props.name} 
                    name={props.name} value={props.value} onChange={props.onChange}>
                {props.options.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;