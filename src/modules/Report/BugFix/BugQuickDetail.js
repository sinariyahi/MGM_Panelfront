import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"

function BugQuickDetail(props){
    const order = props.order
    const rows = order.rows
    console.log(rows)
    return(
      <div className="sub-order-table">
        {rows&&rows.map((item,i)=>(
            <div className="sub-row" key={i} 
                style={{backgroundColor:item.findBug?"bisque":"inherit"}}>
            <div className="sub-avatar">
            <div className="sub-avatar-container">
                <img src="/img/lenz01.jpg"
                alt={item.sku}/>
                <div className="sub-info">
                    <p className="sub-name">برند: {item.brand} متریال: {item.material}</p>
                    <p className="sub-id">کد محصول: {item.sku}</p>
                </div>
            </div>
            </div>
            <div className="sub-num">فی: {normalPriceCount(item.price)}</div>
            <div className="sub-num" style={{minWidth:"60px"}}> تعداد: {item.count}</div>
            <div className="sub-num" >تخفیف: {item.off}</div>
            <div className="sub-price">مبلغ تخفیف: {normalPriceCount(item.calcDiscount)}</div>
            <div className="sub-price">تخفیف سایت: {normalPriceCount(item.discount)}</div>
        </div>
        
        ))}
        </div>
    )
}
export default BugQuickDetail