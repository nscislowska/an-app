import React, { Component } from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import watch from '../images/pocket-watch.jpg';
import aliens from '../images/aliens.jpg';
import beach from '../images/beach.jpg';
import { connect } from "react-redux";
import { RootState } from "../redux/store/store";
// import { HashLink } from 'react-router-hash-link';
import Chat from "../components/Chat";

class LandingPage extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render(){
        const welcomeMessage = `Welcome${this.props.isLoggedIn ? " "+this.props.user.firstname : ""}!`;
        return(
            <>
            <Carousel id="top-banner" className="top-banner">
                <Banner img={watch} title="Time goes on and on!" description="Time-stopping drugs availabe here.."/>
                <Banner img={beach} title="Go on vacation!" description="Diaherria-free travel destinations only here.."/>
                <Banner img={aliens} title="Believe!" description="The truth is out there.."/>
            </Carousel>
            <h2 id="main-title">{welcomeMessage}</h2>  
            <div className="row">
            <Chat></Chat>
            </div>
            </>
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