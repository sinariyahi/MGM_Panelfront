import { useState } from "react"
import StyleInput from "../../../components/Button/Input"
import tabletrans from "../../../translate/tables"
import env from "../../../env"
import formtrans from "../../../translate/forms"

function PricingTab(props){
  const [price,setPrice] = useState()
  const [priceKind,setPriceKind] = useState(0)
  const content = props.content
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  
  const changeAllValue=()=>{
    if(!content.in||!content.in.brand)
    {
        setError({errorText:"برند باید انتخاب شود"})
        setTimeout(()=>setError(""),2000)
        return
    }
    if(!price){
      setError({errorText:"قیمت باید انتخاب شود"})
      setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      return
  }
    if(price.length>4){
        const postOptions={
        method:'post',
        headers: { 
        'Content-Type': 'application/json'},
        //'x-access-token':token.token
        body:JSON.stringify({sku:content.allStock,
            price:priceKind===0?(price&&price.replaceAll( ',', '')):'',
            purchase:priceKind===1?(price&&price.replaceAll( ',', '')):'',
            price1:priceKind===2?(price&&price.replaceAll( ',', '')):''})
    }
    //console.log(priceKind)
    console.log(postOptions)
    fetch(env.siteApi+"/order/stock/price",postOptions)
    .then(res => res.json())
    .then(
        (result) => {
        console.log(result);
        props.setFilters(preState=>({
          ...preState,
          update:Math.random(10)}))
        },
        (error) => {
        console.log(error);
        
        }
    )
    .catch(error => {
        console.log(error)
    })
}
}
  return(<>
  <div className="pricing-wrapper">
    <div className="date-wrappper">
        {/*<div className={props.direction==="ltr"?"checkbox-container":"checkbox-container checkBoxRTL"}>
          <input checked={priceKind===0?true:false} type="checkbox" id="sell"
          onClick={()=>setPriceKind(0)}/>
          <label for="sell">{tabletrans.priceSell[props.lang]}</label>
          <input checked={priceKind===1?true:false} type="checkbox" id="buy"
          onClick={()=>setPriceKind(1)}/>
          <label for="buy">{tabletrans.pricePurchase[props.lang]}</label>
          <input checked={priceKind===2?true:false} type="checkbox" id="notif"
          onClick={()=>setPriceKind(2)}/>
          <label for="notif">{tabletrans.priceNotif[props.lang]}</label>
  </div>*/}
        {/*<div className="date-input ">
          <input type="text" name="" id="start-date" placeholder="Start Date" onFocus="(this.type='date')"
            onBlur="(this.type='text')"/>
        </div>
        <div className="date-input ">
          <input type="text" name="" id="end-date" placeholder="End Date" onFocus="(this.type='date')"
            onBlur="(this.type='text')"/>
  </div>*/}
      </div>
        <div className="priceMatrixHolder">
          <StyleInput title={tabletrans.priceSell[props.lang]} 
            direction={props.direction} class="priceMatrix"
            action={(e)=>setPrice(prevState => ({
              ...prevState,
              price:e
          }))}/>
            
          <StyleInput title={tabletrans.pricePurchase[props.lang]} 
            direction={props.direction} class="priceMatrix"
            action={(e)=>setPrice(prevState => ({
              ...prevState,
              purchase:e
          }))}/>
          <StyleInput title={tabletrans.priceNotif[props.lang]} 
            direction={props.direction} class="priceMatrix"
            action={(e)=>setPrice(prevState => ({
              ...prevState,
              price1:e
          }))}/>
        </div>
      </div>
      {error&&error.errorText?
        <small className="errorHandler">{error.errorText}</small>:
        <></>}
      <div className="submit-btn" onClick={changeAllValue}>
          {formtrans.submit[props.lang]}</div>
      </>
    )
}
export default PricingTab