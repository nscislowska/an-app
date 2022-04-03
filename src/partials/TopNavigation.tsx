import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { NAV_LINKS } from "../constants";
import { RootState } from "../redux/store/store";

const TopNavigation = (props : {className: string}) => {
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);
    const [items, setItems] = useState(NAV_LINKS.top);

    useEffect(() => {
        setItems(isLoggedIn ? NAV_LINKS.top : NAV_LINKS.top.filter((link) => !link.loggedIn));
    }, [isLoggedIn]);

    return(
        <Navigation className={props.className+' top-nav'} items={items}/>
    );
}

export default TopNavigation;