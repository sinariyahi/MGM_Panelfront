import { useState } from "react"

function OrderTab(props){
    const [tab,setTab] = useState(0)
    const setCrm = props.setCrm
    return(
      <nav className="slidemenu">

      <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" checked />
      <label htmlFor="slide-item-1" onClick={()=>{setCrm("orders");setTab(0)}} className={tab===0?"sliderMenuSelect":"sliderMenu"}>
        <span>RX</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" />
      <label htmlFor="slide-item-2" onClick={()=>{setCrm("Stock");setTab(1)}} className={tab===1?"sliderMenuSelect":""}>
        <span>Stock</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-3" className="slide-toggle" />
      <label htmlFor="slide-item-3" onClick={()=>{setCrm("acc");setTab(2)}}
        className={tab===2?"sliderMenuSelect":""}>
        <span>Accessories</span>
        <div className="sliderMenu"></div>
      </label>

      

      

    </nav>
    )
}
export default OrderTab