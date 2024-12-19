import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"

function StockSKU(props){
    const orderSku = props.orderSku
    const [sku,setSku]=useState(1)
    //console.log(order)
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:orderSku})
          }
        fetch(env.siteApi + "/order/stock/find",postOptions)
      .then(res => res.json())
      .then(
        (result) => {setSku(result[0])},
        (error) => {
          console.log(error);
        }
        
    )},[])
    return(
      <>
            {sku?<p className="sub-name">{sku.title}</p>
            :env.loader}</>
    )
}
export default StockSKU