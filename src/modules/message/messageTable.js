import { useState } from "react"
import tabletrans from "../../translate/tables"

function MessageTable(props){
  const message = props.message
  const lang=props.lang;
  
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            
            <th>
              <p>{tabletrans.title[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.enTitle[lang]}</p>
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
          
          
        </tbody>
      </table>

    )
}
export default MessageTable