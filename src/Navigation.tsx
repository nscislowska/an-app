import { Component } from "react";

interface NavigationProps{
    items : {[key : string] : string},
    navType : string,
    isVisible? : boolean;
}

class Navigation extends Component<NavigationProps,any> {
    constructor(props : NavigationProps){
        super(props);
        this.state = {
            activeItemId : 0
        }
    }

    render(){
        let itemStyle = this.props.navType === 'header__nav' ? 'button--primary' : '';
        const navLinks =  Object.entries(this.props.items).map(([title, ref]) => {
            return <a key={title} className={`button ${itemStyle} ${this.props.navType}__item`} href={ref}>{title}</a>
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