import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavigationButton, NavigationItem, NavigationLink } from "../components/Navigation";
import { RootState } from "../redux/store/store";

interface MobileNavigationProps{
    className: string, 
    isVisible: boolean,
    setVisible: Function
    navigationItemLists : NavigationItem[][]
}

interface MobileSubnavigationProps{
    visible: boolean,
    itemList : NavigationItem[],
    title: string
}

const visibilityClass = (isVisible: boolean) => {
    return isVisible ? '' : 'mobile-navigation__sub-navigation--hidden';
}

const MobileSubnavigation = ({itemList, visible, title} : MobileSubnavigationProps) => {
    const [isVisible, setVisibility] = useState(visible);
    
    useEffect(()=> {
        setVisibility(visible);
    },[visible]);

    return(
        <>
        {NavigationButton(title, ()=>{setVisibility(true)}, [], true)}
        <div className={"mobile-navigation__body mobile-navigation__sub-navigation " + visibilityClass(isVisible)}>
            <ul>
                <li key={title} className="nav__item">
                    {NavigationButton(title, ()=>{setVisibility(false)}, [], false)}
                </li>
                {navigationItems(itemList)}
            </ul>
        </div>
        </>
    )

}

const navigationItems = (itemList : NavigationItem[]) => {
    return(
        itemList.map( item =>
            <li key={"mobileNavigation_"+item.name} className="nav__item">
                {item.sub ? <MobileSubnavigation itemList={item.sub} visible={false} title={item.name}/>
                            : NavigationLink(item)}
            </li>
    ));
}

const MobileNavigation = ({className='', isVisible, setVisible, navigationItemLists}:MobileNavigationProps) => {
    const isLoggedIn = useSelector( (state : RootState) => state.sessionReducer.isLoggedIn);
    const [itemLists, setItems] = useState(navigationItemLists);

    

    useEffect(() => {
        setItems(isLoggedIn ? navigationItemLists : navigationItemLists.map( itemList => itemList.filter( item => !item.loggedIn )));
    }, [isLoggedIn]);

    return(
        <nav className={"mobile-navigation"+ className +(isVisible ? ' mobile-navigation--visible' : ' mobile-navigation--hidden')}>
            <div className="mobile-navigation__header">
                <span className="mobile-navigation__title">Hi</span>
                <button className="mobile-navigation__close-bttn" onClick={()=>{setVisible(false)}}>x</button>
            </div>
            <div className={"mobile-navigation__body mobile-navigation__root"}>       
                {itemLists.map( itemList => 
                    <ul className="mobile-navigation__section">
                        {navigationItems(itemList)}
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default MobileNavigation;

