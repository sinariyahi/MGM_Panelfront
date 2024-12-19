import { useState } from "react"
import formtrans from "../../translate/forms"
import tabletrans from "../../translate/tables"
import StyleInput from "./Input"
import env from "../../env"
function Modal(props){
    const [newItem,setNewItem] = useState()
    const token = props.token
    const [ad,setad] = useState(true)
    const updateFactory=(factoryId,value)=>{
      const postOptions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token && token.token,
          userId: token && token.userId,
        },
        body: JSON.stringify({factoryId:factoryId,active:!value}),
  
        
      };
      fetch(env.siteApi + "/panel/product/update-factory", postOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            props.setLoader(Math.random())
            console.log("updated")
          },
          (error) => {
            console.log(error);
          }
        );
    }
    return(
    <dialog id="modal">
      <div className="popup-brand">
        <div className="popup-header">
          <h5>{props.title}</h5>
          <i className="fa-solid fa-close close-modal" style={{color: "#ff0000",cursor: "pointer"}}
          onClick={()=>props.close(0)}></i>
        </div>
        <div className="popup-wrapper">
          {props.options&&props.options.map((opt,i)=>(
            <div className="brand-name-popup" key={i}>
            <p>{opt.title}</p>
            <div className="brand-name-icon">
              <i className="fa-solid fa-pen fa-sm" style={{color: "#00dbdb"}}></i>
              <p>{tabletrans.edit[props.lang]}</p>
              <p onClick={()=>(updateFactory(opt._id,opt.active))}>{opt.active?"فعال":"غیرفعال"}</p>
            </div>
          </div>
          ))}
          
        </div>
        <div className="modalFooter">
        <StyleInput title={formtrans.factory[props.lang]}
            class="modalNew" direction={props.direction}
            action={(e)=>setNewItem(e)}
        />
        <div className="add-brand-btn" onClick={()=>props.addItem(newItem)}>
            <i className="fa-solid fa-plus fa-sm" style={{color: "#00dbdb"}}></i>
            {tabletrans.addNew[props.lang]}</div>
      </div>
      </div>
    </dialog>
    )
}
export default Modal