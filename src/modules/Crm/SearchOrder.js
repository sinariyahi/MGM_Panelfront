import { useEffect, useState } from "react"
import StyleInput from "../../components/Button/Input"
import env from "../../env"
import OrderPopUp from "./orderPopUp"
import InlineOrder from "./Tasks/InlineOrder"

function SearchOrder(props){
    const direction= props.data.direction
    const token = props.data.token
    const [orderNo,setOrderNo] = useState()
    const [purchaseCode,setPurchaseCode] = useState()
    const [orderPop,setOrderPop] = useState(0)
    const [orderList,setOrderList] = useState('')
    const [purchaseStatus,setPurchaseStatus] = useState('')
    const searchOrderNo=(orderNo)=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({search:orderNo})
          }
      fetch(env.siteApi + "/order/rxKharid/search",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){}
            else{
                var index =  orderList.length
                setOrderList(existingItems => {
                    return [
                      ...existingItems.slice(0, index),
                      {value:result[0].rxOrderNo,
                        date:result[0].date,
                        sku:result[0].rxLenz,
                        hesab:"123",
                        price:result[0].totalPrice
                      } ,
                      ...existingItems.slice(index + 1),
                    ]
                  })
            }
        },
        (error) => {
          console.log(error);
        }
      )
        
    }
    const purchaseItems=()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({faktor:orderList,
                purchaseCode})
          }
      fetch(env.siteApi + "/order/purchaseItems",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                
            }
            else{
                setPurchaseStatus(1)
            }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    var [index,setIndex] = useState(0)
    useEffect(()=>{
        const faktorList = orderList
        if(!index||index>faktorList.length) {
            setIndex(0) 
            return}
        
        
        const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token':token.token,
              'userId':token.userId},
              body:JSON.stringify({rxOrderNo:faktorList[index-1].value, 
                purchaseCode:"faktorNo",
                status:"delivered"})
        }
        //console.log(postOptions)
        0&&fetch(env.siteApi+"/order/manage/addrx",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result.error){
                    
                }
                else{
                    orderList[index-1].status="success"
                }
            },
            (error) => {
                console.log(error);
            }
        )
        .catch((error)=>{
            console.log(error)
        })
        orderList[index-1].status="success"
        setTimeout(()=>setIndex(index+1),2000)
        console.log(postOptions)
    },[index])
    //console.log(orderList)
    return(<>
        <div className="searchOrder">
            <StyleInput title="شماره سفارش" 
            action={(e)=>setOrderNo(e)}
            direction="rtl" class="miniText"/>
            <input type="button" value="جستجو" 
            className="miniBtn btn-crm btn-crm-edit"
            onClick={()=>searchOrderNo(orderNo)}/>
        </div>
            <div className="orderSample">
                {orderList?orderList.map((order,i)=>(
                    <InlineOrder order={order} key={i} />
                )):<></>}
            </div>
            {!purchaseStatus?
                <div className="subBtn searchOrder">
                    <StyleInput title="کد خرید" 
                    action={(e)=>setPurchaseCode(e)}
                    direction="rtl" class="miniText"/>
                    <input type="button" className="btn-crm btn-crm-accept" value="رسید خرید" 
                    onClick={purchaseItems}/>
                </div>:
                <div className="subBtn searchOrder">
                <input type="button" className="btn-crm btn-crm-accept" value="تحویل انبار" 
                onClick={()=>setIndex(1)}/>
            </div>
            }
            {orderPop?<OrderPopUp title={"ویرایش سفارش"}
                btnText={"بروزرسانی"} action={()=>{}}
                token={token} crm={props.data.crm}
                customer={"customer"} creator={"creator"}
                direction={direction} access={props.data.access}
                setBoardArray={props.data.setBoardArray}
                store={true}
                data={{orderNo:orderNo,
                    taskStep:props.data.column.enTitle}} 
                close={()=>setOrderPop(0)}
                />:<></>}
        
        </>
    )
    
}
export default SearchOrder