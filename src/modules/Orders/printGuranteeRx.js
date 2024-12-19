import { useState ,useEffect } from "react";
import env, { normalPrice } from "../../env";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function PrintGurantee(props){
  const rxOrderNo = document.location.pathname.split('/')[2];
  const [orderInfo, setOrderInfo] = useState('');
  const [orderError,setOrderError] = useState('در حال دریافت اطلاعات')
  const [OrderLdetail , setOrderLdetail] = useState("")
  const [OrderRdetail , setOrderRdetail] = useState("")
  const [UserInfo , setUserInfo] = useState("")
  const type = rxOrderNo.charAt(0)==="S"?"Stock":"RX";
  const[pDate,setPDate] = useState('');
  //console.log(orderInfo)
  //console.log(userInfo)
  useEffect(() => {
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
          body:JSON.stringify({'orderNo':rxOrderNo})
        }
        fetch(env.siteApi+"/panel/order/getGuranteeOrder",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setTimeout(()=> setOrderInfo(result),200)
              setTimeout(()=> setOrderLdetail(result.lData),200)
              setTimeout(()=> setOrderRdetail(result.rData),200)
              setTimeout(()=> setUserInfo(result.userData),200)
              // setOrderInfo(result)
              // setOrderLdetail(result.lData)
              // setOrderRdetail(result.rData)
              setPDate(new Date(result.orderData.date).toLocaleDateString());
              //totalValues(result.data.Result.InvoiceItems)
              setTimeout(()=> window.print(),200)
              setTimeout(()=> window.close(),1000)
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            setOrderError('خطایی رخ داده است')
            console.log(error)
          })
    
        //window.scrollTo(0, 170);
    },[])
  const pureTitle=(title)=>{
    if(title.includes('2/2'))
      return(title.replace('2/2 ',''))
    if(title.includes('2/4'))
      return(title.replace('2/4 ',''))
    return(title)

  }
    
      return(
      <div className="printArea fishPrintArea guranteePrint">
      <div className="hesabSection">
          <div className="hesabfaSection">
            {/*<h4>Congratulations, on your purchase of authentic Essence</h4>*/}
            <h4><br/><br/></h4>
          </div>
        </div>
        <table className="hesabfaMainTable">
          <tbody>
            <tr>
              <td colSpan={5} className="padding-td">Order No:{rxOrderNo} 
               _Dt.{pDate}</td>
            </tr>
            <tr className="guranteeRow">
              <td>#</td>
              <td>Sph</td>
              <td>Cyl</td>
              <td>Axis</td>
              <td>Add</td>
            </tr>
            <tr  className="guranteeRow">
              <td>{OrderRdetail&&OrderRdetail.align}</td>
              <td>{OrderRdetail&&OrderRdetail.sph}</td>
              <td>{OrderRdetail&&OrderRdetail.cyl}</td>
              <td>{OrderRdetail&&OrderRdetail.axis}</td>
              <td>{OrderRdetail&&OrderRdetail.add}</td>
            </tr>
            <tr  className="guranteeRow">
              <td>{OrderLdetail&&OrderLdetail.align}</td>
              <td>{OrderLdetail&&OrderLdetail.sph}</td>
              <td>{OrderLdetail&&OrderLdetail.cyl}</td>
              <td>{OrderLdetail&&OrderLdetail.axis}</td>
              <td>{OrderLdetail&&OrderLdetail.add}</td>
            </tr>
            {/* {orderInfo&&orderInfo.stockFaktor.map((items,i)=>(
              i<2&&
            <tr key={i} className="guranteeRow">
              <td>{items.align}</td>
              <td>{items.sph?items.sph:orderDetail[i].sph}</td>
              <td>{items.cyl?items.cyl:orderDetail[i].cyl}</td>
              <td>{items.axis}</td>
              <td>{items.add}</td>
            </tr>))} */}
            <tr>
              <td colSpan={5} className="padding-td">{OrderLdetail.brandName&& OrderLdetail.brandName.toUpperCase()+" "+OrderLdetail.lenzIndex+" "+OrderLdetail.material}</td>
            </tr>
            <tr>
              <td colSpan={5} className="padding-td">{orderInfo&&orderInfo.orderData.consumer?
                orderInfo.orderData.consumer:UserInfo.cName}</td>
            </tr>
          </tbody>
        </table>
        <div className="footerGurantee">
          <span >
              {/*REMEMBER , YOUR EYES SHOULD BE REGULARY TESTED BY YOUR EYE CARE PROFESSIONAL*/}
          </span>
        </div>
    </div>
    )
    
}
export default PrintGurantee