import { Component } from "react";

interface NavigationProps{
    items : {[key : string] : string},
    navType : string,
    isVisible? : boolean;
}

class Navigation extends Component<NavigationProps,any> {
    constructor(props : NavigationProps){
        super(props);    
    }

    render(){
        const navLinks =  Object.entries(this.props.items).map(([title, ref]) => {
            return <a key={title} className={`${this.props.navType}__item`} href={ref}>{title}</a>
        });

        let isVisibleClass: string;
        if (this.props.isVisible === undefined){
            isVisibleClass = "";
        } else{
            if(this.props.isVisible === true){
                isVisibleClass = `${this.props.navType}--visible`;
            } else{
                isVisibleClass = `${this.props.navType}--hidden`;
            }
        }

        return(
        <nav className={`nav ${this.props.navType} ${isVisibleClass}`}>
            {navLinks}
        </nav>
        );
    }
}


export default Navigation;