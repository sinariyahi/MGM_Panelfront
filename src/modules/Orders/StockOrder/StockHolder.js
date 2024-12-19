import { useEffect, useState } from "react"
import env from "../../../env"
import StyleInput from "../../../components/Button/Input"
import tabletrans from "../../../translate/tables"
import errortrans from "../../../translate/error"


function StockHolder(props){
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;

    const url = window.location.pathname.split('/')[3]
    const [editRow , setEditRow] = useState(-1)
    const [newCount , setCount] = useState(0)
    const [content ,setContent ] = useState()
    useEffect(() => {
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({stockOrderNo:url})
          }
      fetch(env.siteApi + "/order/fetch-stock",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setContent(result)
        },
        (error) => {
          console.log(error);
        }
      )
    },[])
    const updateValue=(sku,sph,cyl,count)=>{
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({stockOrderNo:url,
              sku:sku,cyl:cyl,sph:sph,count:count?count:newCount})
          }
      fetch(env.siteApi + "/panel/order/editStockOrder",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setEditRow(-1)
        },
        (error) => {
          console.log(error);
        }
      )
    }
    return(
    <div className="user-list" style={{direction:"rtl"}}>
        <div class="od-header">
            <div className="od-header-info"></div>
            <div class="od-header-btn ">
            
              <div class="print-btn" onClick={()=>window.open("/orders/print/"+url,'_blank')}>
                <i class="fa-solid fa-print" ></i>
                <p>{tabletrans.print[lang]}</p>
              </div>
            </div>
        </div>

        {/*<table>
            <thead>
                <tr>
                    <th>آیتم 1</th>
                    <th>آیتم 1</th>
                    <th>آیتم 1</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
        </table>*/}
        <table className="stock-detail-table">
            <tbody>
                <tr>
                    <th>شناسه</th>
                    <th>نام محصول</th>
                    <th>cyl</th>
                    <th>sph</th>
                    
                    <th>تعداد</th>
                    <th>عملیات</th>

                </tr>
                {content&&content.stockFaktor&&content.stockFaktor.map((item,i)=>(
                    <tr key={i}>
                        <td>{item.sku}</td>
                        <td  className="countEditStock"><strong>{item.brand}</strong><br/>
                            <small>{item.material} - {item.index}</small>
                        </td>
                        <td style={{direction:"ltr"}}>{item.cyl}</td>
                        <td style={{direction:"ltr"}}>{item.sph}</td>
                        
                        <td className={item.isEdit?"countEditStock editCount":"countEditStock"}>
                            <StyleInput label="تعداد" class={"countEdit"}
                            defaultValue={item.count} 
                            action={(e)=>(setCount(e),setEditRow(i))}/>
                            {i==editRow?
                            <i className="fa fa-check" onClick={()=>updateValue(item.sku,item.sph,item.cyl)}></i>:<></>}
                            <sub>{item.oldCount}</sub>
                        </td>
                        <td><i className="fa fa-trash" onClick={()=>updateValue(item.sku,item.sph,item.cyl,0)}></i></td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
    )
}
export default StockHolder