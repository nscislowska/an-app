import React, { Component } from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import watch from '../images/pocket-watch.jpg';
import aliens from '../images/aliens.jpg';
import beach from '../images/beach.jpg';
import { connect } from "react-redux";
import { RootState } from "../redux/store/store";
import { HashLink } from 'react-router-hash-link';

class LandingPage extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render(){
        const welcomeMessage = `Welcome${this.props.isLoggedIn ? " "+this.props.user.firstname : ""}!`;
        return(
            <div>
            <h2 id="main-title">{welcomeMessage}</h2>  
            <span>On this page:</span>
            <ol style={{margin : '0.2em auto 0.6em'}}>
                <li>Side menu hides for smaller viewports</li>
                <li><HashLink to="/" elementId="ads" smooth={true}>Ads</HashLink> are switched with side buttons</li>
                <li>Menu "options" to nothing</li>
            </ol>
            <span>On <i>Account</i> page you can:</span>
            <ol style={{margin : '0.2em auto 0.6em'}}>
                <li>Log in</li>
                <li>Change user data</li>
            </ol>
            <div id="ads">
            <label htmlFor="adsDisplay" style={{display: 'block', fontSize : '1.2em', textAlign: 'center'}}>Ads</label>
            <Carousel name="adsDisplay" items={
                [<Banner img={watch} title="Time goes on and on!" description="Time-stopping drugs availabe here.."/>,
                <Banner img={beach} title="Go on vacation!" description="Diaherria-free travel destinations only here.."/>,
                <Banner img={aliens} title="Believe!" description="The truth is out there.."/>]}
            />
            </div>
            <p>
                Aliquam id rutrum tellus. Sed odio justo, lacinia ac tincidunt non, dignissim vitae urna. Sed accumsan accumsan quam, at pharetra enim rhoncus eu. Proin fringilla ipsum ex, a faucibus justo posuere quis. Nunc viverra ultrices augue et mattis. Curabitur tincidunt sapien tortor, tempus pharetra nulla viverra sit amet. Suspendisse tempus ex molestie, pretium nisi ac, bibendum purus. Donec ultrices neque tellus, a congue dolor elementum et. Ut tincidunt sapien elit, id egestas quam rutrum nec.
                
                Nullam scelerisque nunc quis est ultrices, vel suscipit elit ullamcorper. Fusce ultrices ac mi sed semper. Nam non nibh nibh. Nam ut elit ipsum. Sed in nibh condimentum, ultrices mi quis, blandit eros. Pellentesque at enim quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                
                Pellentesque malesuada nunc eget elit aliquam, at aliquam velit consectetur. Pellentesque blandit eu sapien eget malesuada. Aliquam erat volutpat. Aenean vel ligula odio. Ut varius urna ac purus elementum efficitur. Suspendisse potenti. Aenean nec enim a est dapibus posuere. Praesent finibus gravida lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse imperdiet luctus sagittis. Vivamus eget dolor leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc id hendrerit augue, sit amet tristique nisl. In hac habitasse platea dictumst. Phasellus sed nisi vel lectus efficitur iaculis.
                
            </p>
            </div>
        );
    }
}

const mapStateToProps = (state : RootState) => {
    return {
        isLoggedIn: state.sessionReducer.isLoggedIn,
        user: state.sessionReducer.user
    }
  }

const mapDispatchToProps = (dispatch : Function) => {
    return {
    }
  }
  
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);