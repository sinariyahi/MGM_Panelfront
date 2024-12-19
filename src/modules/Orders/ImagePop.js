function ImagePop(props){
    const imgSrc = props.iDisplay;
    const title = props.title;
    var showData = '';
   
    return(
        <div className="popHolder" style={{display:props.iDisplay===-1?"none":"block"}}>
            <div className="popText popImagePreview">
                <div className="popHeader">
                    <i className="icon-size fas fa-close" onClick={()=>props.setIDisplay(-1)}></i>
                    <strong>{title}</strong>
                </div>
                <div className="popImage">
                    <img src={imgSrc} alt={title} />
                </div>
            </div>
        </div>
    )
}
export default ImagePop