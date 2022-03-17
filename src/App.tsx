import React, { useState } from 'react';
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import watch from './images/pocket-watch.jpg';
import aliens from './images/aliens.jpg';
import beach from './images/beach.jpg';
import Carousel from './components/Carousel';
import { sideCategories, sideLinks, topLinks } from './constants';

function App() {
  const [sideNavIsVisible, setSideNavIsVisible] = useState(false);

  return (
    <div className="App">
    <header className="header container">
        <div className="header__container">
        <button aria-label="Rozwiń menu" className="header__hamburger" onClick = {()=>{setSideNavIsVisible(!sideNavIsVisible)}}>
            <i className="fa fa-bars fa-2x"></i>
        </button>
        <div className="header__logo">
            <a href="index.html" className="header__logo__link">
                MAGIX
            </a>
        </div>
        <Navigation navClassName={'top-nav'} isVertical={false} links={topLinks}/>
        </div>
    </header>

    <div className="content container">
        <Navigation navClassName={"side-nav"} isVertical={true} links={sideLinks} categories={sideCategories} isVisible={sideNavIsVisible}/>
        <main>
            <nav className="breadcrumbs">
                <ul>
                    <li className="crumb"><a href="#">Homepage</a></li>
                </ul>
            </nav>
            <h2 id="main-title">Welcome</h2>  
            <span>On this wasteland:</span>
            <ol style={{margin : '0.5em auto'}}>
                <li>Menu options lead to nowewhere</li>
                <li>Side menu hides for smaller devices</li>
                <li>Carousel is interactive</li>
            </ol>
            <Carousel items={
                [<Banner img={watch} title="Time goes on and on!" description="Time-stopping drugs availabe here.."/>,
                <Banner img={beach} title="Go on vacation!" description="Diaherria-free travel destinations only here.."/>,
                <Banner img={aliens} title="Believe!" description="The truth is out there.."/>]}
            />
            <p>
                Aliquam id rutrum tellus. Sed odio justo, lacinia ac tincidunt non, dignissim vitae urna. Sed accumsan accumsan quam, at pharetra enim rhoncus eu. Proin fringilla ipsum ex, a faucibus justo posuere quis. Nunc viverra ultrices augue et mattis. Curabitur tincidunt sapien tortor, tempus pharetra nulla viverra sit amet. Suspendisse tempus ex molestie, pretium nisi ac, bibendum purus. Donec ultrices neque tellus, a congue dolor elementum et. Ut tincidunt sapien elit, id egestas quam rutrum nec.
                
                Nullam scelerisque nunc quis est ultrices, vel suscipit elit ullamcorper. Fusce ultrices ac mi sed semper. Nam non nibh nibh. Nam ut elit ipsum. Sed in nibh condimentum, ultrices mi quis, blandit eros. Pellentesque at enim quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                
                Pellentesque malesuada nunc eget elit aliquam, at aliquam velit consectetur. Pellentesque blandit eu sapien eget malesuada. Aliquam erat volutpat. Aenean vel ligula odio. Ut varius urna ac purus elementum efficitur. Suspendisse potenti. Aenean nec enim a est dapibus posuere. Praesent finibus gravida lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse imperdiet luctus sagittis. Vivamus eget dolor leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc id hendrerit augue, sit amet tristique nisl. In hac habitasse platea dictumst. Phasellus sed nisi vel lectus efficitur iaculis.
                
            </p>
        </main>
    </div>

    <footer className="footer container">
        <div className='footer__container'>
            footer
        </div>
    </footer>
    </div>
  );
}

export default App;
