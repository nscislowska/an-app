import { useState } from "react";
import Button from "./Button";

interface CarouselProps {
    children: JSX.Element[],
    className: string,
    id: string
}

const makeIndex = (id: string, i: number) => id+"_"+i

const Carousel = ({children, className='', id} : CarouselProps) => {
    const [offset, setOffset] = useState(0);
    const step=100;
    const minOffset = -step*(children.length-1);
    const maxOffset = 0;

    let items: JSX.Element[] = [];

    if (children) {
        items = children.map( (child, i) => <>
            <li id={makeIndex(id, i)} key={makeIndex(id, i)} className="carousel__item">
                {child}  
            </li>
        </>);
    }
    else {
        items = [<li key={makeIndex(id, 0)} className="carousel__item">
            <div className="image-not-found"></div>
        </li>]
    }

    return(
        <div id={id} className={'carousel '+className}>
            {offset < maxOffset ? <Button onClick={() => { setOffset(offset + step); } }
                    className="button button--default carousel__button carousel__button--prev" onClickParams={[]}>
                    <i className="arrow left xl"/></Button> : null}
            <ol style={{transform: `translateX(${offset}%)`}}>
                {items}
            </ol>
            {offset > minOffset ? <Button onClick={() => { setOffset(offset - step); } }
                    className="button button--default carousel__button carousel__button--next" onClickParams={[]}>
                    <i className="arrow right xl"/></Button> : null}
        </div>
    );


}

export default Carousel;