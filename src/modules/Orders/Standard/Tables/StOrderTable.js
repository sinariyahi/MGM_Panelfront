import { useState } from "react"
import tabletrans from "../../../../translate/tables"
import Status from "../../../Components/Status"


function StOrderTable(props){
  const popup = props.popup
  const content = props.content
  const lang=props.lang;
  const TableTitle=[
    {Id:1,Title:tabletrans.rowNumber[lang]},
    {Id:2,Title:tabletrans.customer[lang]},
    {Id:3,Title:tabletrans.order[lang]},
    {Id:4,Title:tabletrans.date[lang]},
    {Id:5,Title:tabletrans.status[lang]},
    {Id:6,Title:"سایر امکانات"},
  ]
  console.log(content)
    return(
    <table className="order-table">
      <thead>
        <tr>
          {TableTitle.map((th)=>(
            <th key={th.Id}>
              <p>{th.Title}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content&&content.map((item,i)=>(
        <tr key={i} className="accordion order-tr">
            <td>{i+1}</td>
            <td>{item.userDetail[0].cName}</td>
            <td>{item.xtraOrderNo}</td>
            <td>
              <div className="or-date">
                    <p className="date">{new Date(item.date)
                    .toLocaleDateString(props.lang==="persian"?'fa':'en')}</p>
                    <p className="time">{new Date(item.date)
                    .toLocaleTimeString(props.lang==="persian"?'fa':'en')}</p>
              </div>
            </td>
            <td>
              <Status status={item.status} class={"order-status"} 
                  lang={props.lang}/>
            </td>
            
            <td>
              <i class="fa-solid fa-eye" onClick={()=>{popup(item.xtraOrderNo)}}>
              </i>
            </td>
        </tr>
        ))}
      </tbody>
    </table>

    )
}
export default StOrderTable