import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { NAV_LINKS } from "../constants";
import { RootState } from "../redux/store/store";

interface SideNavigationProps {
    className : string
}

const SideNavigation = ({className = ''}:SideNavigationProps) => {
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);
    const [items, setItems] = useState(NAV_LINKS.side);

    useEffect(() => {
        setItems(isLoggedIn ? NAV_LINKS.side : NAV_LINKS.side.filter((item) => !item.loggedIn));
    }, [isLoggedIn]);

    return(
        <Navigation className={'nav-vertical side-nav-desktop ' + className}
            items={items}/>
    );
}

export default SideNavigation;