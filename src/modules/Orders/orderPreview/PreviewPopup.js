import { useEffect, useState } from "react"
import env from "../../../env"
import PreViewRX from "./PreViewRX"
import PreViewStock from "./PreViewStock"
function PreviewPopup(props){
    const orderNum =props.ordernum
    console.log(orderNum)
    //console.log(data)
    return(
    <section className="delete-modal" style={{direction:"rtl"}}>
        <div className="modal-backdrop show-modal">
            <div className="task-popup fullPopUp">
                <i className="fa fa-remove closeModal" 
                    onClick={()=>props.close(0)}></i>
                {orderNum.includes("R")?<PreViewRX Rxnum={orderNum} access={props.access}/>:
                <PreViewStock Stocknum={orderNum} access={props.access}/>}
            </div>
            
        </div>
    </section>
    )
}
export default PreviewPopup