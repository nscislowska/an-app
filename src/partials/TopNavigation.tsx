import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { TOP_LINKS } from "../constants";
import { RootState } from "../redux/store/store";

const TopNavigation = (props : {className: string}) => {
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);
    const [items, setItems] = useState(TOP_LINKS);

    useEffect(() => {
        setItems(isLoggedIn ? TOP_LINKS : TOP_LINKS.filter((link) => !link.loggedIn));
    }, [isLoggedIn]);

    return(
        <Navigation className={props.className+' top-nav'} items={items}/>
    );
}

export default TopNavigation;