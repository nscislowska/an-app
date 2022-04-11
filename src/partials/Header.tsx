import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MOBILE_LINKS } from "../constants";
import { RootState } from "../redux/store/store";
import MobileNavigation from "./MobileNavigation";
import TopNavigation from "./TopNavigation";

const Header = () => {
    const [navIsVisible, navSetVisible] = useState(false);
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);

    return(
        <header className="page-header page-container">
            <div className="page-header__container row">
                <button aria-label="Expand menu" className="col-sm-4 col-md-0 col-lg-0 page-header__hamburger" onClick = {()=>{navSetVisible(!navIsVisible)}}>
                    <i className="fa fa-bars fa-2x"></i>
                </button>
                <MobileNavigation navigationItemLists={MOBILE_LINKS} className="" isVisible={navIsVisible} setVisible={navSetVisible}/>
                <div className="col-sm-8 col-md-4 col-lg-4 page-header__logo">
                    <Link to='/' className="page-header__logo__link">
                        MAGIX
                    </Link>
                </div>
                <div className="page-header__right col-sm-0 col-md-8 col-lg-8">
                    <Link className='page-header__right__item' to='/account'>Account</Link>
                    {isLoggedIn && <Link className='page-header__right__item' to='/logout'>Log out</Link>}
                </div>
            </div>
        </header>
    );

}

export default Header;

