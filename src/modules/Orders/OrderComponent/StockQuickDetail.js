import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"
import StockSKU from "./StockSKU"

function StockQuickDetail(props){
    const order = props.order
    const [sku,setSku]=useState(1)
    //console.log(order)
    /*useEffect(() => {
        const body={
            sku:"manager"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:order.rxLenz.split(',')[2]})
          }
        fetch(env.siteApi + "/order/manufacture/find",postOptions)
      .then(res => res.json())
      .then(
        (result) => {setSku(result)},
        (error) => {
          console.log(error);
        }
        
    )},[])*/
    return(
      <>
            {sku?<div className="sub-order-table">
                {order&&order.stockFaktor&&order.stockFaktor.map((stock,i)=>(
                    <div className="sub-row" key={i}>
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <img src="/img/lenz01.jpg"
                        alt={stock.sku}/>
                        <div className="sub-info">
                        <StockSKU orderSku={stock.sku}/>
                        <p className="sub-id">کد محصول: {stock.sku}</p>
                        </div>
                    </div>
                    </div>
                    <div className="sub-num">{stock.count}</div>
                    <div className="sub-price">{normalPriceCount(stock.price)}</div>
                </div>
                ))}
                
            </div>:env.loader}</>
    )
}
export default StockQuickDetail