import { useEffect, useState } from "react";
import env, { normalPrice } from "../../env";

function PreviewStock(props){
    const [stockDetail,setStockDetail] = useState([])
    const defData = props.defData;

    const lensRows = defData.stockFaktor;
    const lensOrg = props.defData.stockFaktorOrg;
    const stockServices = defData.stockService;
    const stockTarash = defData.stockTarash

    
    console.log(lensRows)
    /*useEffect(() => { 
        if(lensRows){
        for(var i=0;i<lensRows.length;i++){
            const oldItem = (lensOrg.find(item=>item.sku===lensRows[i].sku))
            const oldSku = !oldItem?lensOrg[i].sku:''
            console.log(oldSku)
        //const data = orderData&&orderData.rxLenz?orderData.rxLenz.split(','):[];
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:lensRows[i].sku})
          }
          fetch(env.siteApi+"/order/stock/find",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result,data)
                setStockDetail(existingItems => {
                    return [
                    ...existingItems.slice(0, i),
                    {...result[0], ...oldItem?{oCount:oldItem.count,oAlign:oldItem.align}:
                                    {oSku:oldSku}},
                    ...existingItems.slice(i + 1),
                    ]
                })

                //setStockDetail(result)
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
        }  }
    },[lensRows])*/
    return(
        <div className="orderDataHolder">
            <table className="orderTable stockTable rtl">
                <tbody>
                    <tr>
                        <th style={{width:"20px"}}>ردیف</th>
                        {/*<th style={{width:"35px"}}>کد</th>*/}
                        <th>برند</th>
                        <th>SPH</th>
                        <th>CYL</th>
                        <th style={{width:"35px"}}>تعداد</th>
                        <th>قیمت واحد</th>
                        <th>تخفیف</th>
                        <th>قیمت کل</th>
                        <th>توضیحات</th>
                    </tr>
                    {lensRows&&lensRows.map((faktorItem,i)=>(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td dangerouslySetInnerHTML={{__html:
                        "<strong>"+(faktorItem.brand&&faktorItem.brand.toUpperCase())+"</strong>"+"-"+
                            faktorItem.index+"-"+faktorItem.material}}></td>
                        <td style={{direction:"ltr"}}>{faktorItem.sph}</td>
                        <td style={{direction:"ltr"}}>{faktorItem.cyl}</td>
                        <td>
                            {faktorItem.count}</td>
                        <td style={{direction: "ltr"}} >{normalPrice(faktorItem.rawPrice)}</td>
                        <td style={{direction: "ltr"}} >{normalPrice(faktorItem.discount)}</td>
                        <td style={{direction: "ltr"}}>
                           {normalPrice(faktorItem.sumPrice)}</td>
                        <td>{faktorItem.description}</td>
                    </tr>))}
                    {stockServices&&stockServices.map((service,i)=>(
                       <tr key={i}>
                       <td>*</td>
                       {/*<td >{faktorItem.sku}</td>*/}
                       
                       <td>{service.title}</td>
                       <td><b>{/*service.brand*/}</b></td>
                       <td>-</td>
                       <td>1</td>
                       <td style={{direction: "ltr"}}> {normalPrice(service.colorPrice?service.colorPrice:service.price)}</td>
                       <td style={{direction: "ltr"}}> {normalPrice(service.colorPrice?service.colorPrice:service.price)}</td>
                       <td>{service.title&&service.title.includes('گارا')?<input type="button" value="چاپ گارانتی"
                        onClick={()=>window.open("/print-guarantee/"+defData.stockOrderNo,'_blank')}/>:<></>}</td>
                   </tr> 
                    ))}
                    {defData&&defData.stockGuranteeName?
                       <tr>
                       <td>*</td>
                       {/*<td >{faktorItem.sku}</td>*/}
                       
                       <td>{defData.stockGuranteeName}</td>
                       <td><b>{/*service.brand*/}</b></td>
                       <td>-</td>
                       <td>1</td>
                       <td style={{direction: "ltr"}}> {normalPrice(defData.stockGurantee)}</td>
                       <td style={{direction: "ltr"}}> {normalPrice(defData.stockGurantee)}</td>
                       <td></td>
                       <td><input className="print-btn" type="button" value="چاپ گارانتی"
                        onClick={()=>window.open("/print-guarantee/"+defData.stockOrderNo,'_blank')}/></td>
                   </tr> :<></>
                    }
                    {stockTarash?
                       <tr>
                       <td>*</td>
                       {/*<td >{faktorItem.sku}</td>*/}
                       
                       <td>خدمات تراش</td>
                       <td><b>{/*service.brand*/}</b></td>
                       <td>-</td>
                       <td>-</td>
                       <td style={{direction: "ltr"}}> {normalPrice(stockTarash.price)}</td>
                       <td style={{direction: "ltr"}}> {normalPrice(stockTarash.price)}</td>
                       <td><input type="button" value="مشخصات تراش"
                        onClick={()=>window.open("/tarashdetail/"+defData.stockOrderNo,'_blank')}/></td>
                   </tr> :<></>
                    }
                    <tr>
                        <td colSpan={3}></td>
                        <td>تعداد</td>
                        
                        <td>{defData.totalCount&&defData.totalCount}</td>
                        
                        <td>جمع کل</td>
                        <td>{defData.stockOrderDiscount}</td>
                        <td style={{fontSize:"15px",fontWeight:"bold"}}>
                            {normalPrice(defData.stockOrderPrice?
                            defData.stockOrderPrice:defData.totalPrice)} ریال</td>
                    </tr>
                    {/*<tr>
                        <td colSpan={6}></td>
                        <td>تخفیف</td>
                        <td style={{fontSize:"15px",fontWeight:"bold"}}>
                            {normalPrice(defData.stockOrderPrice?
                            defData.stockOrderPrice:defData.totalPrice)} ریال</td>
                            </tr>*/}
                </tbody>
            </table>
            
        </div>
    )
}
export default PreviewStock