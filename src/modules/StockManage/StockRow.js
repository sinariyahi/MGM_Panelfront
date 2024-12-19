import { useState } from "react"
import { normalPriceCount } from "../../env"
import errortrans from "../../translate/error"
import StockSubMenu from "./StockModules/StockSubMenu"

function StockRow(props){
  const content = props.content
  const [showMenu,setShowMenu] = useState(0)
    return(
            <tr>
              <td onClick={()=>setShowMenu(1)}>
                <i className="fa-solid fa-bars"></i>
                {showMenu?<StockSubMenu direction={props.direction} 
                lang={props.lang} setShowMenu={setShowMenu} sku={content.sku}/>:<></>}
              </td>
              <td>{content.brandName}</td>
              <td>{content.lenzIndex}</td>
              <td>{content.sph}</td>
              <td>{content.cyl}</td>
              <td>{content.material}</td>
              <td>{content.coating}</td>
              <td>{normalPriceCount(content.price)}</td>
              <td>
                <div className={content.active=="false"?"ban-status order-status":
                  "act-status order-status"}>
                  {content.active=="false"?"غیرفعال":"فعال"}
                </div>
              </td>
              <td>
              {content.sku}
              </td>

            </tr>
    )
}
export default StockRow