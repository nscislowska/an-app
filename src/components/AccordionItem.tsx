interface AccordionItemProps{
    title : string,
    isOpen : boolean,
    headerClass? : string,
    changeState : (React.MouseEventHandler),
}

function AccordionItem(props : React.PropsWithChildren<AccordionItemProps>){
    let iconClass = `arrow ${props.isOpen ? 'up' : 'down'}`;
    return(
        <div className='accordion__item'>
            <button data-key={props.title} onClick={props.changeState}
                    className={` button accordion__header ${props.headerClass ? props.headerClass : ""}` }>
                <span className="accordion__item__title">{props.title}</span>
                <i className={`accordion__header__icon ${iconClass}`}></i>
            </button>

            {props.isOpen &&
            <div className="accordion__pane">
                {props.children}
            </div>
            }
        </div>
    );
}

export default AccordionItem;