import React ,{ useState ,useRef}from 'react'
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { TextField } from "@material-ui/core"
import ReactToPrint from "react-to-print";
import DatePickerSingle from "../components/Button/DatePickerSingle";

import errortrans from "../translate/error";
import tabletrans from "../translate/tables";
import env from "../env";
import StyleInput from "../components/Button/Input";
import StyleSelect from "../components/Button/AutoComplete";
import PrintGurantee from '../modules/Orders/printGurantee';
const cookies = new Cookies();


const Garantee = (props) => {
  var contentRef = useRef<HTMLDivElement>(null);
  var regex = new RegExp("^[a-zA-Z0-9,._ ]+$");
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [RxStock,setRxStock] = useState("")
  const [OrderID,setOrderID] = useState(document.location.pathname.split('/')[2]?document.location.pathname.split('/')[2]:"")
  const [loading,setLoading] = useState(0)
  const [search,setSearch] = useState('')
  const [content,setContent] = useState("")
  const [Customer,setCustomer] = useState("")
  const [Table,setTable] = useState("")
  const [List,setList] = useState("")
  const [ListOption,setListOption] = useState("")
  const [PageType,setPageType] = useState("hand")
  const [manufactureList,setManufactureList] = useState()
  const [filterBrand,setfilterBrand] = useState()
  const [filterMaterial,setfilterMaterial] = useState()
  const [filterIndex,setfilterIndex] = useState()
  const [Calc , setCalc]= useState("pos")

  const token=cookies.get(env.cookieName)
  const handleTableChange = (property, value) => {
    const newValue = value ? (value._id ? value._id : value) : "";
    setTable((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
  };
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
  useEffect(() => {
    const postOptions={
        method:'get',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify()
      }

      fetch(env.siteApi + "/order/params",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
        setLoading(0)
        setList(result)
        // /setList(result.map((item)=>(
        //    JSON.parse(`{${item.title}:${item.paramValue.split(',')}}`)
        //  )));
        
      },
        (error) => {
        setLoading(0);
        console.log(error);
      }
      );
  }, []);
  useEffect(() => {
  var body=filterBrand?{
      brand:filterBrand,
      lenzIndex:filterIndex,
      material:filterMaterial,
  }:{}
  const postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json',
      'x-access-token':token.token,
      'userId':token.userId},
      body:JSON.stringify(body)
    }
    fetch(env.siteApi+(RxStock=="rx"?"/order/manufacture/list":"/order/stock/adminlist"),postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setManufactureList(result)
        },
        (error) => {
          console.log({error:error});
        }
      )
      .catch((error)=>{
        console.log(error)
      })
  },[filterBrand,filterMaterial,filterIndex,RxStock])

  const getListSC =(titleValue)=>{
  var  paramOut= List.find(item=>item.title==titleValue)
  if(!paramOut)return([])
    const paramNeg = paramOut.paramNegative.split(',')
    const paramPos = paramOut.paramValue.split(',')
  return(Calc=="neg"?paramNeg:paramPos)}
  const getList =(titleValue)=>{
  var  paramOut= List.find(item=>item.title==titleValue)
  if(!paramOut)return([])
  return(paramOut.paramValue.split(','))}

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
  console.log(filterMaterial)
  useEffect(()=>{
    setfilterIndex('')
    setfilterMaterial('')
  },[filterBrand])
  useEffect(()=>{ 
    setfilterIndex('')
  },[filterMaterial])
if(!content||!List)
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
              <button onClick={()=>{(setOrderID(search));setPageType("search")}}  className="search-btn">جستجو</button>
              <button onClick={()=>setPageType("hand")}  className="search-btn garantee-btn">گارانتی المثنی</button>
            </div>
            
            <div className="rx-stock">
              {PageType!=="hand"?<>
                <div className={`tab-btn ${RxStock=="stock"?"active-tab":""} `} >Stock</div>
                <div className={`tab-btn ${RxStock=="rx"?"active-tab":""} `} >Rx</div>
              </>:<>
              <DatePickerSingle
                title="تاریخ"
                class="filterComponent"
                direction={props.lang.dir}
                local={props.lang.dir === "ltr" ? "en" : "fa"}
                action={(e) =>handleTableChange("date",e)}
              />
              <div onClick={()=>setRxStock("stock")} className={`tab-btn ${RxStock=="stock"?"active-tab":""} `} >Stock</div>
              <div onClick={()=>setRxStock("rx")} className={`tab-btn ${RxStock=="rx"?"active-tab":""} `} >Rx</div>
              
              </>
              }
            </div>
            <div className="brand-container">
              {PageType!=="hand"?
              <>
                <div className="fake-input">
                  <p>{content.lData&&content.lData.brandName}</p>
                  <span>{tabletrans.brand[lang]}</span>
                </div>
                <div className="fake-input">
                  <p>{content.lData&&content.lData.material}</p>
                  <span>{tabletrans.material[lang]}</span>
                </div>
              </>:
              <>
                <TextField label="(به انگلیسی)نام مشتری" id="Customer"
                  value = {Customer?Customer:""}
                  onChange={(e)=>(regex.test(e.target.value)&&
                  e.target.value.length<19||e.target.value==='')&&
                  (setCustomer(e.target.value),console.log(e.target.value))}
                    variant="outlined"
                />
                <div className="brand-select-wrapper">
                  
                  <StyleSelect
                    title="Brand"
                    options={manufactureList&&manufactureList.brandList||[]}
                    style={{ width: "100%"}}
                    value={filterBrand&&filterBrand||''}
                    action={(e,value)=>{handleTableChange("brand", e);
                      setfilterBrand(e?e:'')
                      }
                    }
                    />
                    <StyleSelect
                    title="Material"
                    options={manufactureList&&(RxStock=="rx"?manufactureList.material:manufactureList.materialList)||[]}
                    style={{ width: "100%"}}
                    disabled={filterBrand&&filterBrand?false:true}
                    value={filterMaterial&&filterMaterial||''}
                    action={(e,value)=>{handleTableChange("material", e);
                        setfilterMaterial(e?e:'')}}
                        
                    
                    
                    />
                  <StyleSelect
                    title="Index"
                    options={manufactureList&&(RxStock=="rx"?manufactureList.lenzIndex:manufactureList.lenzIndexList)||[]}
                    style={{ width: "100%"}}
                    disabled={filterMaterial&&filterMaterial?false:true}
                    value={filterIndex&&filterIndex||''}
                    action={(e,value)=>{handleTableChange("Index", e);
                      setfilterIndex(e?e:'')}}
                    />
                  
                  {/* <StyleSelect
                    title="Design"
                    action={(e) => handleTableChange("design", e)}
                    /> */}
                </div>
              </>}
              
            </div>
          </div>
          <div className="image-wrapper">
            {(RxStock=="stock")&&(PageType!=="hand")?<img 
            src={env.siteApiUrl+(content.orderData.stockFaktor&&content.orderData.stockFaktor[1]&&content.orderData.stockFaktor[1].productDetail?content.orderData.stockFaktor[1].productDetail.imageUrl:"")} 
            alt="product image" />:<img src="/img/brands/ESSENCE.svg"
            alt="Rx"/>}
          </div>
        </div>
        
          {PageType!=="hand"?<div className="fake-input product-title"><p>{content.lData.facoryName+"|"+content.lData.lenzType+"|"+content.lData.lenzDesign+"|"+content.lData.lenzIndex+"|"+content.lData.material}</p><span>نام محصول</span>
          </div>:<>
          
          
          </>}
        
        <div className="lathe-container">
          <div className="input-index-wrapper">
            <p className="title">OD</p>
            {PageType!=="hand"?
            <>
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
              {/* <div className="fake-input">
                <p>{content.lData&&content.lData.pd}</p>
                <span>PD</span>
              </div> */}
              {RxStock=="rx"?
              <div className="fake-input">
                <p>{content.lData&&content.lData.add}</p>
                <span>Add</span>
              </div>:<></>}
            </>:
            <>
              <div className="calc-btn">
                <div onClick={()=>setCalc("pos")} className={Calc=="pos"?"d-btn pos-btn":"d-btn"}>+</div>
                <div onClick={()=>setCalc("neg")} className={Calc=="neg"?"d-btn neg-btn":"d-btn"}>-</div>
              </div>
              <StyleSelect
              title="Sphere"
              options={getListSC("SPH")}  
              action={(e) => handleTableChange("Lsph", e)}
              />
              <StyleSelect
              title="Cylinder"
              options={getListSC("CYL")} 
              action={(e) => handleTableChange("Lcyl", e)}
              />
              <StyleSelect
              title="Axis"
              options={getList("Axis")}
              action={(e) => handleTableChange("Laxis", e)}
              />
              {/* <StyleSelect
              title="PD"
              options={getList("PDFar")}
              action={(e) => handleTableChange("Lpd", e)}
              /> */}
              <StyleSelect
              title="Add"
              options={getList("ADD")}
              action={(e) => handleTableChange("Ladd", e)}
              />

            </>}
          </div>
          <div className="input-index-wrapper">
            <p className="title">OS</p>
            {PageType!=="hand"?
            <>
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
              {/* <div className="fake-input">
                  <p>{content.rData&&content.rData.pd}</p>
                  <span>PD</span>
              </div> */}
              
              {RxStock=="rx"?
              <div className="fake-input">
                <p>{content.rData&&content.rData.add}</p>
                <span>Add</span>
              </div>:<></>}
            </>:
            <>
              <div className="calc-btn">
                <div onClick={()=>setCalc("pos")} className={Calc=="pos"?"d-btn pos-btn":"d-btn"}>+</div>
                <div onClick={()=>setCalc("neg")} className={Calc=="neg"?"d-btn neg-btn":"d-btn"}>-</div>
              </div>
              <StyleSelect
              title="Sphere"
              options={getListSC("SPH")}
              action={(e) => handleTableChange("Rsph", e)}
              />
              <StyleSelect
              title="Cylinder"
              options={getListSC("CYL")} 
              action={(e) => handleTableChange("Rcyl", e)}
              />
              <StyleSelect
              title="Axis"
              options={getList("Axis")}
              action={(e) => handleTableChange("Raxis", e)}
              />
              {/* <StyleSelect
              title="PD"
              options={getList("PDFar")}
              action={(e) => handleTableChange("Rpd", e)}
              /> */}
              <StyleSelect
              title="Add"
              options={getList("ADD")}
              action={(e) => handleTableChange("Radd", e)}
              />
            </>}
          </div>
        </div>
        {PageType!=="hand"?
        <div className="info-container">
          
            
            {/* <TextField label="(به انگلیسی)نام مشتری" id="Customer"
                  value = {Customer?Customer:""}
                  onChange={(e)=>(regex.test(e.target.value)&&
                    e.target.value.length<19||e.target.value==='')&&
                    (setCustomer(e.target.value),console.log(e.target.value))}
                      variant="outlined"
            /> */}
            
            <div className="fake-input">
                <p>{content.orderData.consumer?content.orderData.consumer:content.userData.cName}</p>
                <span>نام مصرف کننده(به انگلیسی)</span>
            </div>
            <div className="fake-input">
                <p>{content.price&&content.price}</p>
                <span>هزینه گارانتی به تومان</span>
            </div>
          <div className="btn-wrapper">
            <button onClick={()=>sendGarantee()} className="submit">ذخیره و چاپ</button>
          </div>

        </div>:
        <div className="info-container">
          <div className="btn-wrapper">
            <ReactToPrint
            trigger={() => {
              return <button className="submit">پرینت</button>;
            }}
            content={() => contentRef}
            />
          </div>
        </div>}
      </div>
      <div className="print-table">
        <div ref={el => (contentRef = el)}>
          <PrintGurantee Table={Table} customer={Customer}/>
        </div>
      </div>
    </div>
  )
}

export default Garantee
