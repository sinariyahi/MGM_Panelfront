import env from "../../../env";
import formtrans from "../../../translate/forms";
import UserClassPlace from "./UserClassPlace";

function UserClassSelect(props){
    const token = props.token
    const classes=props.classes
    if(!classes)
    return env.loader
    else return(
        <div className="assign-wrapper">
            <UserClassPlace header={formtrans.availableClass[props.lang]} token={token} 
            classes = {classes.availableClass} userData={props.userData}
            setChangeClass={props.setChangeClass}/>
            <UserClassPlace header={formtrans.assignClass[props.lang]} token={token} 
            classes = {classes.assignClass} userData={props.userData}
            setChangeClass={props.setChangeClass}/>
        </div>
    )
}
export default UserClassSelect