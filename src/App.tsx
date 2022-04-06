import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import AccountPage from './pages/account';
import NotFoundPage from './pages/notFound';
import PrivateRoute from './components/PrivateRoute';
import SideNavigation from './partials/SideNavigation';
import PageHeader from './partials/Header';
import LogoutPage from './pages/logout';

function App(){
      return (
        <div className="App">
            <PageHeader/>
            <main className="content page-container">
                {/* <nav className="breadcrumbs">
                        <ul>
                            <li className="crumb"><Link to='/'>Homepage</Link></li>
                        </ul>
                </nav> */}
                <Routes>
                    <Route path='/' element={<LandingPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/logout' element={<LogoutPage/>}/>
                    <Route path="/account" element={
                                            <PrivateRoute>
                                                <AccountPage/>
                                            </PrivateRoute>}/>
                    {/* <Route path='/shop' element={<ShopPage/>}/> */}
                    <Route path='/*' element={<NotFoundPage/>}/>
                </Routes>
            </main>

            <footer className="footer page-container">
                <div className='footer__container'>
                    footer
                </div>
            </footer>
        </div>
    );
};

export default App;

