import { Component } from "react";

class Carousel  extends Component<any,any>{
    constructor(props : any){
        super(props);
        this.state = {
            items : this.buildItemList()
        }

        this.buildItemList = this.buildItemList.bind(this);
        this.shiftForward = this.shiftForward.bind(this);
        this.shiftBack = this.shiftBack.bind(this);
    }

    buildItemList(){
        let items = []
        for (let i in this.props.items){
            items.push(<li key={i} className="carousel__display__item">{this.props.items[i]}</li>)
        }
        return items;
    }

    shiftForward(){
        this.setState((state : any) => {
            let items = [];
            for (let i=1; i<state.items.length; i++){
                items.push(state.items[i]);
            }
            items.push(state.items.shift());
            return {items : items}
        })
    }

    shiftBack(){
        this.setState((state : any) => {
            let items = [];
            for (let i=0; i<state.items.length-1; i++){
                items.push(state.items[i]);
            }
            items.unshift(state.items.pop());
            return {items : items}
        })
    }

    render(){
        return(
            <div className="carousel" style={{height:'20em'}}>
            <button className="button button--default carousel__button" onClick={this.shiftBack}><i className="arrow left"></i></button>
            <ul className="carousel__display" >
                {this.state.items}
            </ul>
            <button className="button button--default carousel__button" onClick={this.shiftForward}><i className="arrow right"></i></button>
            </div>
        )}


}

export default Carousel;