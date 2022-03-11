
function Banner(props : {img: string|null, title: string, description : string}){

    let style = (props.img) ? {backgroundImage: `url(${props.img})`} : {} ;

    return(
        <div className="banner" style={style}>
            <p className="banner__text">  
            <span className="banner__text__title">{props.title}</span> 
            {props.description} 
            </p>
        </div>
    );
}

export default Banner;