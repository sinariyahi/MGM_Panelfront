import { useState ,useEffect } from "react";

function PrintGurantee(props){
      const Table = props.Table
      return(
      <div className="printArea fishPrintArea guranteePrint">
      <div className="hesabSection">
          <div className="hesabfaSection">
            <h4><br/><br/></h4>
          </div>
        </div>
        <table className="hesabfaMainTable">
          <tbody>
            <tr>
              <td colSpan={5} className="padding-td">
                Order No: <span>Duplicate</span>
               _Dt.<span>{Table.date?(Table.date.year+"/"+Table.date.month+"/"+Table.date.day):""}</span>
               </td>
            </tr>
            <tr className="guranteeRow">
              <td>#</td>
              <td>Sph</td>
              <td>Cyl</td>
              <td>Axis</td>
              <td>Add</td>
            </tr>
            <tr  className="guranteeRow">
              <td>R</td>
              <td>{Table&&Table.Rsph}</td>
              <td>{Table&&Table.Rcyl}</td>
              <td>{Table&&Table.Raxis}</td>
              <td>{Table&&Table.Radd}</td>
            </tr>
            <tr  className="guranteeRow">
              <td>L</td>
              <td>{Table&&Table.Lsph}</td>
              <td>{Table&&Table.Lcyl}</td>
              <td>{Table&&Table.Laxis}</td>
              <td>{Table&&Table.Ladd}</td>
            </tr>
            <tr>
              <td colSpan={5} className="padding-td">{Table.brand?(Table.brand+" "+Table.material+" "+Table.Index):"-"}</td>
            </tr>
            <tr>
              <td colSpan={5} className="padding-td">{props.customer?props.customer:"-"}</td>
            </tr>
          </tbody>
        </table>
        <div className="footerGurantee">
          <span>
              
          </span>
        </div>
    </div>
    )
    
}
export default PrintGurantee