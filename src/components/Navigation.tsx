import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";
import Accordion from "./Accordion";
import Button from "./Button";

export interface NavigationItem {name: string, path?: string, loggedIn? : boolean, sub?: NavigationWithLink[]};
export interface NavigationWithSub {name: string, loggedIn? : boolean, sub: NavigationWithLink[]};
export interface NavigationWithLink {name: string, path: string, loggedIn? : boolean};

export const NavigationLink = (item: NavigationWithLink) => {
    return <Link key={item.name} to={item.path}>{item.name}</Link>
}

export const NavigationButton = (text: string, onclick: Function, onClickParams: any[], forward: boolean) => {
    return <Button className={"accordion__header nav__item"} onClick={onclick} onClickParams={onClickParams}>
                {!forward ? <i className={'arrow left'}></i> : null}
                {text}
                {forward ? <i className={'arrow right'}></i> : null}
            </Button>
}

interface NavigationProps{
    items : NavigationItem[],
    className?: string
}

const initPath : string[] = [];

const Navigation = ({items, className=''}: NavigationProps) => {
    const isLoggedIn = useSelector((state : RootState) => state.sessionReducer.isLoggedIn);
    const [path, setPath] = useState(initPath);

    const navClass = className;
    const itemClass = 'nav__item';

    const currentItems = isLoggedIn ? items : items.filter(item => !item.loggedIn);

    return(
        <nav className={navClass}>
            {/* {path.length > 0 ? NavigationButton({name: path.join(' / '), sub: []}, ()=>{}, false) : null} */}
            {currentItems.map((item) => {
                return item.path ? NavigationLink(item as NavigationWithLink) :
                        // item.sub ? NavigationButton(item as NavigationWithSub, ()=>{}, true) :
                        null;
            })}
        </nav>
    );
}


export default Navigation;