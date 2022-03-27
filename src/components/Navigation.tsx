import { Component } from "react";
import { Link } from "react-router-dom";
import Accordion from "./Accordion";

interface LinkList {[key : string] : string};

interface NavigationProps{
    links : LinkList,
    categories? : {[key : string] : LinkList},
    navType : string,
    className?: string,
    isVertical : boolean;
    isVisible? : boolean;
}

class Navigation extends Component<NavigationProps,any> {

    itemClass1 =  `nav__item ${this.props.navType}__item ${this.props.navType}__item--level1`;
    itemClass2 = `nav__item ${this.props.navType}__item ${this.props.navType}__item--level2`;

    constructor(props : NavigationProps){
        super(props);
        this.state = {
            
        }

        this.getVisibilityClass = this.getVisibilityClass.bind(this);
    }

    getVisibilityClass(){
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

        return isVisibleClass;
    }

    makeLinks(list : LinkList, className:string){
        return  Object.entries(list).map(([title, ref]) => {
            return <Link key={title} className={className} to={ref}>{title}</Link>
        });
    }


    render(){
        return(
        <nav className={`nav 
                        ${this.props.isVertical ? "nav-vertical" : 'nav-horizontal'} 
                        ${this.props.navType} 
                        ${this.getVisibilityClass()}
                        ${this.props.className ? this.props.className : ""} `}>

            {this.makeLinks(this.props.links, this.itemClass1)}

            {this.props.categories &&
            <Accordion headerClass={this.itemClass1} items={
                Object.entries(this.props.categories).map(([category, linkList]) => {
                    return {title : category, pane : this.makeLinks(linkList, this.itemClass2)}
                })
            }></Accordion>
            }
        </nav>
        );
    }
}


export default Navigation;