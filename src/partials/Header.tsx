import { useState } from "react";
import { Link } from "react-router-dom";
import { MOBILE_LINKS } from "../constants";
import MobileNavigation from "./MobileNavigation";
import TopNavigation from "./TopNavigation";

const PageHeader = () => {
    const [navIsVisible, navSetVisible] = useState(false);

    return(
        <header className="header page-container">
            <div className="header__container row">
                <button aria-label="Expand menu" className="col-sm-4 col-md-4 col-lg-0 header__hamburger" onClick = {()=>{navSetVisible(!navIsVisible)}}>
                    <i className="fa fa-bars fa-2x"></i>
                </button>
                <MobileNavigation navigationItemLists={MOBILE_LINKS} className="" isVisible={navIsVisible} setVisible={navSetVisible}/>
                <div className="col-sm-8 col-md-8 col-lg-4 header__logo">
                    <Link to='/' className="header__logo__link">
                        MAGIX
                    </Link>
                </div>
                <TopNavigation className="col-sm-0  col-md-4 col-lg-8"/>
            </div>
        </header>
        
    );

}

export default PageHeader;

