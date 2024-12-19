import React ,{ useState ,useRef}from 'react'
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { TextField } from "@material-ui/core"

import errortrans from "../translate/error";
import tabletrans from "../translate/tables";
import env from "../env";
import StyleInput from "../components/Button/Input";
import StyleSelect from "../components/Button/AutoComplete";
import PrintGurantee from '../modules/Orders/printGurantee';
const cookies = new Cookies();


const Garantee = (props) => {
  var regex = new RegExp("^[a-zA-Z0-9,._ ]+$");

  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [RxStock,setRxStock] = useState("")
  const [OrderID,setOrderID] = useState(document.location.pathname.split('/')[2]?document.location.pathname.split('/')[2]:"")
  const [loading,setLoading] = useState(0)
  const [search,setSearch] = useState('')
  const [content,setContent] = useState("")
  const [Customer,setCustomer] = useState("")

  const token=cookies.get(env.cookieName)
  
  
  useEffect(() => {
    setLoading(1)
    const body={
      orderNo:OrderID,
    }
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify(body)
      }

      fetch(env.siteApi + "/panel/order/getGuranteeOrder",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
        setLoading(0)
        
        setContent('')
        setTimeout(()=> setContent(result),200)
        setTimeout(()=> setRxStock(result.status),200)
        
      },
        (error) => {
        setLoading(0);
        console.log(error);
      }
      );
}, [OrderID]);
  const sendGarantee =()=>{
  setLoading(1)
    const body={
      orderNo:content.orderData.rxOrderNo?content.orderData.rxOrderNo:content.orderData.stockOrderNo,
      guranteeName:Customer,
    }
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify(body)
      }
      fetch(env.siteApi + "/panel/order/setGuranteeOrder",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
        const OrderNum =content.orderData.rxOrderNo?content.orderData.rxOrderNo:content.orderData.stockOrderNo
        const OrderType = (OrderNum.includes("S"))?"stock":"rx"
        setLoading(0)
        {RxStock=="stock"?window.open("/print-guaranteeStock/"+OrderNum,'_blank'):window.open("/print-guaranteeRx/"+OrderNum,'_blank')}
      },
        (error) => {
        setLoading(0);
        console.log(error);
      }
      );
  }
if(!content)
  return(
      <div >Waiting</div>
    )
  return (
    <div className="user lathe-page" style={{ direction: direction }}>
      <h4>{tabletrans.garantee[lang]}</h4>
      <div className="list-container">
        
        <div className="lathe-container">
          
          <div className="container">
            <div className="search-container">
              <StyleInput
                title={tabletrans.barcode[lang]}
                direction={lang.dir}
                className="search-input"
                action={(e)=>{setSearch(e)}}
                doAction={(e)=>e.keyCode===13?setOrderID(search):console.log("common")}
                defaultValue={content.orderData&&content.orderData.rxOrderNo?content.orderData.rxOrderNo:content.orderData.stockOrderNo}
              />
              <button onClick={()=>{setOrderID(search)}}  className="search-btn">جستجو</button>
              <button onClick={()=>window.open("/print-guarantee/")}  className="search-btn garantee-btn">گارانتی دستی</button>
            </div>
            <div className="rx-stock">
              <div className={`tab-btn ${RxStock=="stock"?"active-tab":""} `} >Stock</div>
              <div className={`tab-btn ${RxStock=="rx"?"active-tab":""} `} >Rx</div>
            </div>
            <div className="brand-container">
              <div className="fake-input">
                <p>{content.lData&&content.lData.brandName}</p>
                <span>{tabletrans.brand[lang]}</span>
              </div>
              <div className="fake-input">
                <p>{content.lData&&content.lData.material}</p>
                <span>{tabletrans.material[lang]}</span>
              </div>
              
              
            </div>
          </div>
          <div className="image-wrapper">
            <img src="../lathe-sample.jpeg" alt="Lenz" />
          </div>
        </div>
        <div className="fake-input product-title"><p>{content.lData.facoryName+"|"+content.lData.lenzType+"|"+content.lData.lenzDesign+"|"+content.lData.lenzIndex+"|"+content.lData.material}</p><span>نام محصول</span></div>
        <div className="lathe-container">
          <div className="input-index-wrapper">
            <p className="title">OD</p>
            
            <div className="fake-input">
                <p>{content.lData&&content.lData.sph}</p>
                <span>Sphere</span>
            </div>
            <div className="fake-input">
                <p>{content.lData&&content.lData.cyl}</p>
                <span>Cylinder</span>
            </div>
            <div className="fake-input">
                <p>{content.lData&&content.lData.axis}</p>
                <span>Axis</span>
            </div>
            <div className="fake-input">
                <p>{content.lData&&content.lData.pd}</p>
                <span>PD</span>
            </div>
            
            {RxStock=="rx"?
            <div className="fake-input">
              <p>{content.lData&&content.lData.add}</p>
              <span>Add</span>
            </div>:<></>}
          </div>
          <div className="input-index-wrapper">
            <p className="title">OS</p>
            
            <div className="fake-input">
                <p>{content.rData&&content.rData.sph}</p>
                <span>Sphere</span>
            </div>
            <div className="fake-input">
                <p>{content.rData&&content.rData.cyl}</p>
                <span>Cylinder</span>
            </div>
            <div className="fake-input">
                <p>{content.rData&&content.rData.axis}</p>
                <span>Axis</span>
            </div>
            <div className="fake-input">
                <p>{content.rData&&content.rData.pd}</p>
                <span>PD</span>
            </div>
            
            {RxStock=="rx"?
            <div className="fake-input">
              <p>{content.rData&&content.rData.add}</p>
              <span>Add</span>
            </div>:<></>}
          </div>
        </div>
        <div className="info-container">
          
            
            <TextField label="(به انگلیسی)نام مشتری" id="Customer"
                  value = {Customer?Customer:""}
                  onChange={(e)=>(regex.test(e.target.value)&&
                    e.target.value.length<19||e.target.value==='')&&
                    (setCustomer(e.target.value),console.log(e.target.value))}
                      variant="outlined"
            />
            
            <div className="fake-input">
                <p>{content.price&&content.price}</p>
                <span>هزینه گارانتی به تومان</span>
            </div>
          
          {/* <StyleInput
              title="توضیحات"
              direction={lang.dir}
          /> */}
          {/* <div className="dense-btn">
            <input className="switch-input" type="checkbox" id="switch" />
            <label className="switch-label" htmlFor="switch"></label>
            <p>فوری</p>
          </div> */}
          <div className="btn-wrapper"><button onClick={()=>sendGarantee()} className="submit">ذخیره و چاپ</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Garantee
