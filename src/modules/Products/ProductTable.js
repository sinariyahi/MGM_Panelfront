import { useState } from "react"
import tabletrans from "../../translate/tables"
import ProductTableRow from "./ProductTableRow";

function ProductTable(props){
  const product = props.product
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
            <th style={{width:"300px"}}>
              <p>{tabletrans.productTitle[lang]}</p>
              <i></i>
            </th>
            <th style={{width:"120px"}}>
              <p>{tabletrans.category[lang]}</p>
              <i></i>
            </th>
            <th style={{width:"120px"}}>
              <p>{tabletrans.brand[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.price[lang]}</p>
              <i></i>
            </th>
            {/* <th>
            <p>{tabletrans.status[lang]}</p>
              <i></i>
            </th> */}
            <th>
            <p>{tabletrans.action[lang]}</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {product&&product.filter?product.filter.map((product,i)=>(
            <ProductTableRow detail={detail} setFilters={props.setFilters} showDetail={showDetail} 
            product={product} index={i} key={i} lang={lang} token={props.token}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default ProductTable