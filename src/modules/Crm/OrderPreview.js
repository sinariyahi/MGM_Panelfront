import { normalPriceCount } from "../../env";

function OrderPreview(props){
    const content = props.content;
    const product = props.product
    return(
            <div className="admin-table-sec ">
                <table className=" ">
                    <tbody>
                        <tr>
                            <th style={{width:"20px"}}>ردیف</th>
                            {/*<th style={{width:"35px"}}>کد</th>*/}
                            <th>مشخصات عدسی</th>
                            <th style={{width:"35px"}}>SPH</th>
                            <th>CYL</th>
                            <th>قیمت کل</th>
                        </tr>
                        {content&&content.odMain?
                        <tr>
                            <td>OD</td>
                            {/*<td >{faktorItem.sku}</td>*/}
                            
                            <td>{product.brandName+" - "+
                                product.lenzIndex+" - "+product.material}</td>
                            <td style={{direction: "ltr"}}>
                                {content.odMain.split(',')[0]}</td>
                            <td style={{direction: "ltr"}}>
                                {content.odMain.split(',')[1]}</td>
                            <td style={{direction: "ltr"}}>
                               {normalPriceCount(24000)}</td>
                            
                        </tr>:<></>}
                        {content&&content.osMain?
                        <tr>
                            <td>OS</td>
                            {/*<td >{faktorItem.sku}</td>*/}
                            
                            <td>{product.brandName+" - "+
                                product.lenzIndex+" - "+product.material}</td>
                            <td style={{direction: "ltr"}}>
                                {content.osMain.split(',')[0]}</td>
                            <td style={{direction: "ltr"}}>
                                {content.osMain.split(',')[1]}</td>
                            <td style={{direction: "ltr"}}>
                               {normalPriceCount(24000)}</td>
                            
                        </tr>:<></>}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>قیمت کل</td>
                            <td style={{fontSize:"15px",fontWeight:"bold"}}>{normalPriceCount(content.stockOrderPrice)} ریال</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
    )
}
export default OrderPreview