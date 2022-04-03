import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";
import Accordion from "./Accordion";
import Button from "./Button";

export interface NavigationItem {name: string, path?: string, loggedIn? : boolean, sub?: NavigationWithLink[]};
interface NavigationWithSub {name: string, loggedIn? : boolean, sub: NavigationWithLink[]};
interface NavigationWithLink {name: string, path: string, loggedIn? : boolean};

interface NavigationProps{
    items : NavigationItem[],
    className?: string
}

const initPath : string[] = [];

const Navigation = ({items, className=''}: NavigationProps) => {
    const isLoggedIn = useSelector((state : RootState) => state.sessionReducer.isLoggedIn);
    const [itemHistory, setitemHistory] = useState([items]);
    const [path, setPath] = useState(initPath);

    const navClass = className;
    const itemClass = 'nav__item';

    const currentItems = isLoggedIn ? itemHistory[0] : itemHistory[0].filter(item => !item.loggedIn);

    const updateItemHistory = (item: NavigationWithSub, forward: boolean) => {
        let newItemHistory = [...itemHistory];
        let newPath = [...path];
        forward ? newItemHistory.unshift(item.sub) : newItemHistory.shift();
        forward ? newPath.push(item.name) : newPath.pop();
        setitemHistory(newItemHistory);
        setPath(newPath);
    }

    const NavigationLink = (item: NavigationWithLink) => {
        return <Link key={item.name} className={itemClass} to={item.path}>{item.name}</Link>
    }

    const NavigationButton = (item: NavigationWithSub, forward: boolean) => {
        return <Button key={item.name} className={itemClass+" accordion__header"} onClick={updateItemHistory} onClickParams={[item, forward]}>
                    {!forward ? <i className={'arrow left'}></i> : null}
                    {item.name}
                    {forward ? <i className={'arrow right'}></i> : null}
                </Button>
    }

    return(
        <nav className={navClass}>
            {path.length > 0 ? NavigationButton({name: path.join(' / '), sub: []}, false) : null}
            {currentItems.map((item) => {
                return item.path ? NavigationLink(item as NavigationWithLink) :
                        item.sub ? NavigationButton(item as NavigationWithSub, true) :
                        null;
            })}
        </nav>
    );
}


export default Navigation;