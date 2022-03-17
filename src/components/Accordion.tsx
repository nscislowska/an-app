import React, { Component } from "react";
import AccordionItem from "./AccordionItem";

interface AccordionProps{
    items : {title : string, pane : any}[],
    class? : string,
    headerClass? : string
}

class Accordion extends Component<AccordionProps, any>{
    constructor(props : AccordionProps){
        super(props);
        this.state={
            openItem : ""
        }

        this.changeState = this.changeState.bind(this);
    }

    changeState(e : React.MouseEvent<HTMLButtonElement>){
        if(e.target instanceof HTMLButtonElement){
            let key = e.target.dataset.key;
            this.setState((state:any)=>{
                if(state.openItem === key){
                    key = "";
                }
                return {openItem : key}
            });
        }
        
    }

    render(){
        let accordionItems = [];
        for (let item of this.props.items){
            accordionItems.push(<AccordionItem key={item.title} title={item.title}
                                                headerClass = {this.props.headerClass}
                                                isOpen={item.title === this.state.openItem}
                                                changeState={this.changeState}>
                                    {item.pane}
                                </AccordionItem>)
        }
        return(
            <div className={"accordion " + this.props.class ? this.props.class : ""}>
                {accordionItems}
            </div>
        );
    };
}


export default Accordion;