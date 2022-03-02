import { Component } from "react";


class Navigation extends Component <any, any>{

    constructor(props: any){
        super(props);
        this.state = {
            activeItemId : 0,
        }

    }

    render(){
        const navLinks =  Object.entries(this.props.navItems).map(([title, ref]) => {
            return <a className={`${this.props.navType}__item`} href={ref}>{title}</a>
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