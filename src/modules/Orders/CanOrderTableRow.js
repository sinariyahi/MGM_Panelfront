import React ,{ useState } from "react"
import Status from "../Components/Status"
import  { normalPriceCount, rxFindCount } from "../../env"
import OrderQuickDetail from "./OrderComponent/OrderQuickDetail"
import StockQuickDetail from "./OrderComponent/StockQuickDetail"

function OrderTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const category = props.category==="Stock"?"stock":"rx"
  const activeAcc = props.index===props.detail
  const order=props.order
  //console.log(order)
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              {props.index+1}</td>
            
            <td>
                  <p onClick={()=> window.location.href=
                    "/orders/detail/"+category==="rx"?order.rxOrderNo:order.stockOrderNo}>
                    {category==="rx"?order.rxOrderNo:order.stockOrderNo}</p>
                
            </td>
            <td>
                <div className="listTd">{order.singleLens?
                order.singleLens.title:''}
                </div>
            </td>
            <td>
              <div className="cu-avatar">
                  <img src={order.expressPrice?"/img/avatar/urgent.png":
                   order.moreInformation?"/img/avatar/comment.png":
                   "/img/avatar/defaultProduct.png"} alt="MGM"
                   title={order.moreInformation}/>
                  <div className="cu-name">
                    <p className="name">{order.userInfo[0]?
                    order.userInfo[0].cName:''}</p>
                    <p className="email">{order.consumer}</p>
                  </div>
                  {order.moreInformation?
                    <i className="fa fa-comment-o" title={order.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <div className="or-date">
                  <p className="date">{new Date(order.date)
                  .toLocaleDateString(props.lang==="persian"?'fa':'en')}</p>
                  <p className="time">{new Date(order.date)
                  .toLocaleTimeString(props.lang==="persian"?'fa':'en')}</p>
                </div>
              </td>
              
              <td>
                
                <p class="cancel-wrapper">
                  {
                    order.serial_number?"کارخانه":(order.status.slice(-4)=="sale"?"واحد فروش":"کاربر")
                  }
                </p>
              </td>
            <td>
              <div className="more-btn">
              <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/orders/detail/"+order.rxOrderNo}></i>
                {/* <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i> */}
              </div>
              {openOption?<div className="sub-more-menu">
                <div className="sub-option sub-delete">
                <i className="tableIcon fas fa-remove" style={{color: "#ff0000"}}></i>
                  <p>Delete</p>
                </div>
                <div className="sub-option sub-edit">
                  <i className="tableIcon fas fa-edit"></i>
                  <p>Edit</p>
                </div>
              </div>:<></>}
            </td>
          </tr>
          {activeAcc?<tr className="sub-order">
        <td colSpan="9">{category==="rx"?
        <OrderQuickDetail order={order}/>:
        <StockQuickDetail order={order}/>}
        </td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default OrderTableRow