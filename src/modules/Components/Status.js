import statustrans from "../../translate/status"

function Status(props){
    var pureStatus = props.status&&props.status.toString().split('|')[0]
    var status = statustrans[pureStatus]
    const text = props.text?props.text:status&&status[props.lang]
      // Handler to call the changeStatus function passed from props
  const handleClick = () => {
    if (props.changeStatus) {
      props.changeStatus();
    }
  };

    if(text==="فعال") status={color:"green",background:"lightGreen"}
    return(
        <div className={props.class} 
            style={{color:status?status.color:"gray",
            backgroundColor:status?status.background:"silver"}}
            onClick={handleClick} // Attaching onClick event
            >
            {text}
        </div>
    )
}
export default Status