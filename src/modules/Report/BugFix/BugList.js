import { useState } from "react"
import tabletrans from "../../../translate/tables"
import BugTableRow from "./BugTableRow";

function BugTable(props){
  const orders = props.orders
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            <th>
              <p>{tabletrans.order[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.customer[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.date[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.bugCount[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.rowCount[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.price[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.status[lang]}</p>
              <i></i>
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders&&orders.filter?orders.filter.map((order,i)=>(
            <BugTableRow detail={detail} showDetail={showDetail} 
              order={order} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default BugTable