import formtrans from "../../translate/forms"
import StockRow from "./StockRow"

function StockList(props){
  const content = props.content
    return(
      <div className="user-list">
      <table className="matrixTable">
        <thead>
          <tr>
            <th><i className="fa-regular fa-file-excel"></i></th>
            <th style={{textAlign:"center"}}>{formtrans.brand[props.lang]}</th>
            <th>{formtrans.lenzIndex[props.lang]}</th>
            <th>{formtrans.sph[props.lang]}</th>
            <th>{formtrans.cyl[props.lang]}</th>
            <th>{formtrans.material[props.lang]}</th>
            <th>{formtrans.coating[props.lang]}</th>
            <th>{formtrans.sellingPrice[props.lang]}</th>
            <th>{formtrans.status[props.lang]}</th>
            <th>{formtrans.sku[props.lang]}</th>

          </tr>
        </thead>
        <tbody>
          {content&&content.stock&&content.stock.map(
          (stock,i)=>(
            <StockRow content={stock} key={i} 
            direction={props.direction} lang={props.lang}/>
          ))}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    )
}
export default StockList