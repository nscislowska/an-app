import { useState } from "react";
import { Link } from "react-router-dom";
import SideNavigationMobile from "./SideNavigationMobile";
import TopNavigation from "./TopNavigation";

const PageHeader = () => {
    const [navIsVisible, navSetVisible] = useState(false);

    return(
        <header className="header page-container">
            <div className="header__container row">
                <button aria-label="Expand menu" className="col-sm-4 col-md-2 col-lg-0 header__hamburger" onClick = {()=>{navSetVisible(!navIsVisible)}}>
                    <i className="fa fa-bars fa-2x"></i>
                </button>
                <SideNavigationMobile className="" isVisible={navIsVisible} setVisible={navSetVisible}/>
                <div className="col-sm-8 col-md-4 col-lg-3 header__logo">
                    <Link to='/' className="header__logo__link">
                        MAGIX
                    </Link>
                </div>
                <TopNavigation className="col-sm-0  col-md-6 col-lg-9"/>
            </div>
        </header>
        
    );

}

export default PageHeader;

