import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { NAV_LINKS } from "../constants";
import { RootState } from "../redux/store/store";

interface SideNavigationMobileProps{
    className: string, 
    isVisible: boolean,
    setVisible: Function
}

const SideNavigationMobile = ({className='', isVisible, setVisible}:SideNavigationMobileProps) => {
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);
    const [items, setItems] = useState(NAV_LINKS);

    useEffect(() => {
        setItems(isLoggedIn ? NAV_LINKS : {top: NAV_LINKS.top.filter((item) => !item.loggedIn),
                                            side: NAV_LINKS.side.filter((item) => !item.loggedIn)});
    }, [isLoggedIn]);

    return(
        <div className={"side-nav-mobile"+ className +(isVisible ? ' side-nav-mobile--visible' : ' side-nav-mobile--hidden')}>
            <button className="side-nav-mobile__item side-nav-mobile__close-bttn nav__item nav__item--level1" onClick={()=>{setVisible(false)}}>x</button>
            <Navigation className={'nav-vertical side-nav-mobile__item'}
                items={items.top}/>
            
            <Navigation className={'nav-vertical side-nav-mobile__item'}
                items={items.side}/>
        </div>
    );
}

export default SideNavigationMobile;