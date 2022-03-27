interface InputRadioProps{
    name : string,
    labels : string[],
    className : {container: string,
                input: string,
                label: string},
    onChange : (React.ChangeEventHandler<HTMLInputElement>),
    values : any[]
}

function Input(props: InputRadioProps){
    let radioGroup = [];
    for (let i in props.labels){
        radioGroup.push(
            <div className={props.className.container}>
                <label className={props.className.label} htmlFor={props.name}>{props.labels[i]}</label>
                <input className={props.className.input} type='radio' id={props.name} 
                    name={props.name} value={props.values[i]} onChange={props.onChange}></input>
            </div>);
        }
    return(
        {radioGroup}
    );
}

export default Input;