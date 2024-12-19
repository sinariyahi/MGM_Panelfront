import { useState } from "react";
import OrderPreview from "./OrderPreview";

function OrderShow(props){
    const [orderInfo, setOrderInfo] = useState('');
    const [rxInfo , setRxInfo] = useState('')
    const [pDate,setPDate] = useState('');
    const content = props.content
    if(!content){
      return(<div className="faktor">
        waiting
      </div>)
    }
    return(
      <div className="faktor">
        <div className="userInfo">
          <div className="userSection">
            <strong>ام جی ام | عدسی سفارشی</strong>
            <span>www.mgmlens.com</span>
            <span>کد: 15</span>
          </div>
          <div className="userSection">
            <h1>MGM Lens</h1>
          </div>
          <div className="userSection">
            <small>تاریخ: <b>{new Date(content&&content.date).toLocaleDateString('fa')}</b></small>
            <small>شماره سفارش: <b>{props.cartNo}</b></small>
            
            <small>ساعت ثبت سفارش: <b>
              {new Date(content&&content.date).toLocaleTimeString('fa')}</b></small>
          </div>
        </div>
          <OrderPreview content={content} 
            product={props.product}/>
        
    </div>
    )
}
export default OrderShow