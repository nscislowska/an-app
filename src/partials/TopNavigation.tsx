import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavigationButton, NavigationItem, NavigationLink } from "../components/Navigation";
import { NAVIGATION_LINKS, TOP_LINKS } from "../constants";
import { RootState } from "../redux/store/store";

interface TopNavigationProps{
    className: string,
}

const TopNavigation = ({className=''} : TopNavigationProps) => {
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);
    const [items, setItems] = useState(NAVIGATION_LINKS);

    useEffect(() => {
        setItems(isLoggedIn ? NAVIGATION_LINKS : NAVIGATION_LINKS.filter((link) => !link.loggedIn));
    }, [isLoggedIn]);

    return(
        <ol className={"top-nav " + className}>
            {items.map((item) => 
                <li className="nav__item top-nav__item">
                    {!item.sub && NavigationLink(item)}
                    {item.sub && <>
                        {NavigationLink(item, {position: 'right', direction: 'down'})}
                        <ol className="nav__item__sub">
                            {item.sub.map((subItem) => 
                                <li className="top-nav__item">{NavigationLink(subItem)}</li>
                            )}
                        </ol>
                    </>}
                </li>
            )}
        </ol>
    );
}

export default TopNavigation;