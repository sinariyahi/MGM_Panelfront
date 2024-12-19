import React from 'react'
import env, { normalPrice, normalPriceCount, purePrice, sumPrice, sumPriceNew , rxFindCount} from "../../../env";


const PreviewStockTable = (props) => {
    const content = props.content
    const actions= props.actions
    
    console.log(actions)
    const actionbtn =(status)=>{
        const token = props.token
        var postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
                "x-access-token":token&&token.token,"userid":token&&token.userId},
            body:JSON.stringify({status,stockOrderNo:props.orderNo})
          }
      fetch(env.siteApi + "/panel/order/editOrderStatus",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          }
          )
          
        
    }
    return (
        <div className="preview-stock-wrapper">
        {content&&content.map((Brand , i)=>(
            <div className="preview-stock-item" key={i}>
                {Brand.data.map((Index,i)=>(<>
                    {Index.data.map((Material,m)=>(<>
                
                        <div className="title">
                            <strong className="index">
                                {Brand.brand?Brand.brand.toUpperCase():"-"} {Index.index}
                            </strong>
                            <strong className="material">
                                {Material.material}
                            </strong>
                        </div>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>SPH</th>
                                        <th>CYL</th>
                                        <th>تعداد</th>
                                        <th>قیمت</th>
                                        <th>جمع</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Material.data.map((item,i)=>(
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{item.sph}</td>
                                            <td>{item.cyl}</td>
                                            <td>{item.count}</td>
                                            <td>{normalPrice(item.rawPrice)}</td>
                                            <td>{normalPrice(item.sumPrice)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{Material.count + "Pcs"}</td>
                                        <td></td>
                                        <td>{normalPrice(Material.price)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                ))}
            </>
        ))}

            </div>
        ))}
        <div className='actionBtn'>
            {actions&&actions.map((btn,i)=>(
                <input className={`${btn.title=="لغو"?"cancel-btn":""} preview-btn`} type='button' value={btn.title} key={i}
                onClick={()=>actionbtn(btn.value)} />
            ))}
        </div>
        </div>
    )
}

export default PreviewStockTable

