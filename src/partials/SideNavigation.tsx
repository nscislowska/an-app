import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { NAVIGATION_LINKS } from "../constants";
import { RootState } from "../redux/store/store";

interface SideNavigationProps {
    className : string
}

const SideNavigation = ({className = ''}:SideNavigationProps) => {
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);
    const [items, setItems] = useState(NAVIGATION_LINKS);

    useEffect(() => {
        setItems(isLoggedIn ? NAVIGATION_LINKS : NAVIGATION_LINKS.filter((item) => !item.loggedIn));
    }, [isLoggedIn]);

    return(
        <Navigation className={'nav-vertical side-nav-desktop ' + className}
            items={items}/>
    );
}

export default SideNavigation;