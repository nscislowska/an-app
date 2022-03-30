import React, { useState } from 'react';
import Navigation from './components/Navigation';
import { HOME_PATH, sideCategories, sideLinks, topLinks } from './constants';
import { Link, Route, Routes } from 'react-router-dom';
import ShopPage from './pages/shop';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import AccountPage from './pages/account';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';
import NotFoundPage from './pages/notFound';

function App(){
    const [sideNavIsVisible, setSideNavIsVisible] = useState(false);
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);

      return (
        <div className="App">
        <header className="header page-container">
            <div className="header__container row">
            <button aria-label="Expand menu" className="col-sm-3 col-md-1 header__hamburger" onClick = {()=>{setSideNavIsVisible(!sideNavIsVisible)}}>
                <i className="fa fa-bars fa-2x"></i>
            </button>
            <div className="col-sm-5 col-md-2 header__logo">
                <Link to={HOME_PATH} className="header__logo__link">
                    MAGIX
                </Link>
            </div>
            <Navigation navType={'top-nav'} className="col-sm-4 col-md-9" isVertical={false} links={topLinks}/>
            </div>
        </header>

        <div className="content page-container row">
            <Navigation navType={"side-nav"} className="col-sm-12 col-md-6 col-lg-3" isVertical={true} links={sideLinks} categories={sideCategories} isVisible={sideNavIsVisible}/>
            <main className='col-sm-12 col-md-12 col-lg-9'>
            <nav className="breadcrumbs">
                    <ul>
                        <li className="crumb"><Link to={HOME_PATH}>Homepage</Link></li>
                    </ul>
            </nav>
            <Routes>
                <Route path={HOME_PATH} element={<LandingPage/>}/>
                {!isLoggedIn && <Route path={HOME_PATH + "/account"} element={<LoginPage/>}/>}
                {isLoggedIn && <Route path={HOME_PATH + "/account"} element={<AccountPage/>}/>}
                <Route path={HOME_PATH + '/shop'} element={<ShopPage/>}/>
                <Route path={HOME_PATH + '/*'} element={<NotFoundPage/>}/>
            </Routes>
            </main>
        </div>

        <footer className="footer page-container">
            <div className='footer__container'>
                footer
            </div>
        </footer>
        </div>
    );
};

export default App;

