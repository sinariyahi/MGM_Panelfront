import { useEffect, useRef, useState } from "react";
import OutsideAlert from "../../../components/Button/OutSideAlert";
import errortrans from "../../../translate/error";

function StockSubMenu(props){
    const ref = useRef(null);
    const sku = props.sku
    OutsideAlert(ref,props.setShowMenu)
    
    return(
    <div className={props.direction==="rtl"?
        "sub-menu rtlMenu":"sub-menu"} ref={ref} >
        {/*<p>{errortrans.edit[props.lang]}</p>*/}
        <p><a target="_blank" href={"https://mgmlens.com/printbarcode/"+sku}>
            {errortrans.barCode[props.lang]}</a></p>
    </div>
    )
}
export default StockSubMenu