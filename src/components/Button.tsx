
interface ButtonProps {
    className: string,
    name?: string,
    onClick : Function,
    onClickParams : any[]
}

const Button = ({className='', onClick, onClickParams, name, children} : React.PropsWithChildren<ButtonProps>) => {

    const onClickWrapper = (e : React.MouseEvent<HTMLButtonElement>) => {
        if(e.target instanceof HTMLButtonElement){
            //let key = e.target.dataset.key; (property data-key)
            onClick(...onClickParams);
        }
    };

    return(
        <button className={className} onClick={onClickWrapper}>
            {children}
        </button>);
};

export default Button;