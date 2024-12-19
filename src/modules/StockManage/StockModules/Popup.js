import { useEffect, useRef, useState } from "react";
import formtrans from "../../../translate/forms"
import OutsideAlert from "../../../components/Button/OutSideAlert";
import StyleInput from "../../../components/Button/Input";
import tabletrans from "../../../translate/tables";
import env from "../../../env";

function Popup(props){
    const ref = useRef(null);
    const data=props.content
    const [itemChange,setItemChange] = useState()
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    OutsideAlert(ref,props.setPopupShow)
    const UpdateItem=()=>{
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({...itemChange,_id:data._id})
          }
          console.log(postOptions)
          props.updateMatrix(itemChange,data.sph,data.cyl)
      fetch(env.siteApi + "/panel/lens/stock-edit",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.error){
            setError({errorText:result.error,
              errorColor:"brown"})
            setTimeout(()=>setError({errorText:'',
              errorColor:"brown"}),3000)
          }
            else{
              setError({errorText:'Updated',errorColor:"green"})
              setTimeout(()=>props.setPopupShow(0),1000)
            }
            
        },
        (error) => {
          console.log(error);
        })
    }
    return(
    <div //onClick={()=>props.setPopupShow(0)} 
    className="matrix-popup">
        <div className="popup-box" ref={ref} id="popit">
            <div className="p-number">
            <p>{formtrans.count[props.lang]}</p>
            <p>{data.store}</p>
            </div>
            <div className="p-number sphPopUp">
                <a href={env.printUrl+"/printbarcode/"+data.sku} target="_blank">
                    <i className="fa fa-barcode blackIcon"/></a>
                <a href={env.printUrl+"/printLabel/"+data.sku} target="_blank">
                    <i className="fa fa-print blackIcon"/></a>
                <small>SPH: {data.sph?data.sph:"0.00"}</small>
                <small>CYL: {data.cyl?data.cyl:"0.00"}</small>
            </div>
            <div className="pricePopup">
                <StyleInput title={tabletrans.price[props.lang]}
                    direction={"rtl"} defaultValue={data.price}
                    action={(e)=>setItemChange(
                        prevState=>({...prevState,
                        price:e})
                    )}
                />
            </div>
            {/*<div className="exist-wrapper">
                <span>فعال/غیرفعال</span>
                <input className="switch-input" type="checkbox" id="switch"/>
                <label className="switch-label" htmlFor="switch"></label>
            </div>*/}
            <div className="exist-wrapper">
                <input id="checkbox_toggle" type="checkbox" className="check"
                defaultChecked={data.active==="false"?true:false}
                    onClick={(e)=>setItemChange(
                        prevState=>({...prevState,
                        active:(!e.target.checked).toString()})
                    )}/>
                <div className="checkbox" style={{direction:"ltr"}}>
                    <label className="slide" htmlFor="checkbox_toggle">
                    <label className="toggle" htmlFor="checkbox_toggle"></label>
                    <label className="text" htmlFor="checkbox_toggle">{tabletrans.available[props.lang]}</label>
                    <label className="text" htmlFor="checkbox_toggle">{tabletrans.notAvailable[props.lang]}</label>
                    </label>
                </div>
            </div>
            {error.errorText?<div className="errorHandler">
                {error.errorText}
            </div>:<></>}
            <div className="popup-submit-btn" onClick={UpdateItem}>
            {formtrans.submit[props.lang]}
            </div>
        </div>
    </div>
    )
}
export default Popup