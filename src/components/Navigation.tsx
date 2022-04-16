import { Link } from "react-router-dom";
import Button from "./Button";

export interface NavigationItem {name: string, path: string, loggedIn? : boolean, sub?: NavigationItem[]};

export const NavigationLink = (item: NavigationItem, icon?: {position: string, direction: string}) => {
    let className = icon ? 'accordion__header' : '';
    return <Link key={item.name} to={item.path} className={className}>
            {icon && icon.position === 'left' ? <i className={'arrow '+ icon.direction}></i> : null}
            {item.name}
            {icon && icon.position === 'right' ? <i className={'arrow '+ icon.direction}></i> : null}</Link>
}

export const NavigationButton = (text: string, onclick: Function, onClickParams: any[], forward: boolean) => {
    return <Button className={"accordion__header nav__item"} onClick={onclick} onClickParams={onClickParams}>
                {!forward ? <i className={'arrow left'}></i> : null}
                {text}
                {forward ? <i className={'arrow right'}></i> : null}
            </Button>
}