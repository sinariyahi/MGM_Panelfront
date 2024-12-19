import { useState } from "react"
import formtrans from "../../translate/forms"
import MatrixHolder from "./StockModules/MatrixHolder"
import PricingTab from "./StockModules/PricingTab"

function StockMatrix(props){
  const [tab,setTab] = useState(0)
    return(
      <div className="product-wrapper">
        <input checked={tab===0?true:false} type="radio" name="page" id="matrix"/>
        <input checked={tab===1?true:false} type="radio" name="page" id="price"/>
        <input type="radio" name="page" id="result"/>
        <div className="label-wrapper-matrix">
          <label id="matrix-label" className="page-label" htmlFor="matrix" 
          onClick={()=>setTab(0)}>{formtrans.existance[props.lang]}</label>
          <label id="price-label" className="page-label" htmlFor="price"
          onClick={()=>setTab(1)}>{formtrans.pricing[props.lang]}</label>
        </div>
        <div id="matrix-page" className="matrix-table">
          {props.content&&props.content.matrixData?<MatrixHolder lang={props.lang} 
            content={props.content} setFilters={props.setFilters}/>:<></>}

          {/*<div className="submit-btn">{formtrans.submit[props.lang]}</div>*/}
        </div>
        <div id="price-page" className="pricing">
          
          <PricingTab lang={props.lang} direction={props.direction}
          content={props.content} setFilters={props.setFilters}/>
          
        </div>
      </div>
    )
}
export default StockMatrix