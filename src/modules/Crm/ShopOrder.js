import { useState } from "react"
import StyleInput from "../../components/Button/Input"
import env from "../../env"
import OrderPopUp from "./orderPopUp"
import InlineOrder from "./Tasks/InlineOrder"

function ShopOrder(props){
    const direction= props.data.direction
    const token = props.data.token
    const [orderNo,setOrderNo] = useState()
    const [orderPop,setOrderPop] = useState(0)
    const [orderList,setOrderList] = useState('')
    const taskDetail = props.data.tasks
    const searchOrderNo=(orderNo)=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({search:orderNo})
          }
      fetch(env.siteApi + "/panel/crmOrder/rxSearch",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){}
            else{
                
            }
        },
        (error) => {
          console.log(error);
        }
      )
        
    }
    console.log(orderList)
    return(
        <div className="searchOrder">
            <StyleInput title="شماره سفارش" 
            action={(e)=>setOrderNo(e)}
            direction="rtl" class="miniText"/>
            <input type="button" value="جستجو" 
            className="miniBtn btn-crm btn-crm-edit"
            onClick={()=>setOrderPop(orderNo)}/>
            {orderPop?<OrderPopUp title={"ویرایش سفارش"}
                    btnText={"بروزرسانی"} action={()=>{}}
                    token={token} crm={"props.crm"}
                    direction={direction} access={"manager"}
                    setBoardArray={props.setBoardArray}
                    data={taskDetail&&taskDetail[0]} close={()=>setOrderPop(0)}
                    />:<></>}
        </div>
    )
    
}
export default ShopOrder