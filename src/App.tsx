import React from 'react';
import Navigation from './Navigation';

const topItems = {
    "Sklep" : "shop.html",
    "Blog" : "blog.html",
    "Kontakt" : "contact.html",
    "O nas" : "about.html"
};

const sideItems = {
    "side 1" : "shop.html",
    "side 2" : "blog.html",
    "side 3" : "contact.html",
    "side 4" : "about.html"
};

function App() {
  let sideNavIsVisible = false;

  return (
    <div className="App">
    <header className="header container">
        <button aria-label="Rozwiń menu" className="header__hamburger" onClick = {()=>{sideNavIsVisible = !sideNavIsVisible}}>
            <i className="fa fa-bars fa-2x"></i>
        </button>
        <div className="header__logo">
            <a href="index.html" className="header__logo__link">
                <h1>MAGIX</h1>
            </a>
        </div>
        <Navigation navType={'top-nav'} navItems={topItems}/>
</header>

    <div className="content container">
        <Navigation navType="side-nav" navItems={sideItems} isVisible={sideNavIsVisible}/>
        <main>
            <nav className="breadcrumbs">
                <ul>
                    <li className="crumb"><a href="#">Strona główna</a></li>
                </ul>
            </nav>
            <h2 id="main-title">Witaj </h2>  
            <p aria-labelledby="#main-title">

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu malesuada orci. Duis vitae lacus eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla cursus scelerisque interdum. Vivamus pellentesque sapien tempus rhoncus finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam magna orci, ullamcorper faucibus quam blandit, tincidunt pellentesque nunc. Vestibulum non volutpat elit. Aenean fringilla posuere sagittis. Nam consequat efficitur quam, sed sagittis augue congue sed. Nulla scelerisque lacinia lorem nec tempor. Praesent in mollis justo.

                Maecenas tincidunt, dui a sodales eleifend, urna diam facilisis nisl, fringilla cursus arcu nibh efficitur enim. Fusce ex quam, feugiat mollis mauris sit amet, rhoncus dapibus mauris. Fusce ac odio vel sem suscipit aliquet ultrices ac mauris. Pellentesque convallis, elit id volutpat cursus, enim lacus pretium sem, ac vestibulum est dui nec tellus. Integer consectetur, magna a bibendum tempus, ante est vulputate est, quis blandit enim purus in quam. Morbi aliquam venenatis scelerisque. Curabitur vulputate sed dui in fermentum. Suspendisse non elementum neque. Donec suscipit justo nec tortor faucibus scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent fringilla eleifend nisl eget viverra. Ut sit amet viverra nibh. Suspendisse nec sem mauris. Nam pulvinar ornare ipsum, nec rutrum mauris condimentum nec. Integer venenatis malesuada odio, in fermentum sem laoreet nec. Morbi luctus vitae ex sed ultricies.
                
                Aliquam id rutrum tellus. Sed odio justo, lacinia ac tincidunt non, dignissim vitae urna. Sed accumsan accumsan quam, at pharetra enim rhoncus eu. Proin fringilla ipsum ex, a faucibus justo posuere quis. Nunc viverra ultrices augue et mattis. Curabitur tincidunt sapien tortor, tempus pharetra nulla viverra sit amet. Suspendisse tempus ex molestie, pretium nisi ac, bibendum purus. Donec ultrices neque tellus, a congue dolor elementum et. Ut tincidunt sapien elit, id egestas quam rutrum nec.
                
                Nullam scelerisque nunc quis est ultrices, vel suscipit elit ullamcorper. Fusce ultrices ac mi sed semper. Nam non nibh nibh. Nam ut elit ipsum. Sed in nibh condimentum, ultrices mi quis, blandit eros. Pellentesque at enim quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                
                Pellentesque malesuada nunc eget elit aliquam, at aliquam velit consectetur. Pellentesque blandit eu sapien eget malesuada. Aliquam erat volutpat. Aenean vel ligula odio. Ut varius urna ac purus elementum efficitur. Suspendisse potenti. Aenean nec enim a est dapibus posuere. Praesent finibus gravida lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse imperdiet luctus sagittis. Vivamus eget dolor leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc id hendrerit augue, sit amet tristique nisl. In hac habitasse platea dictumst. Phasellus sed nisi vel lectus efficitur iaculis.
                
            </p>
        </main>
    </div>

<footer className="container">footer</footer>

    </div>
  );
}

export default App;
