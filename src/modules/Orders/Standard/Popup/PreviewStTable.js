import React from 'react'
import env, { normalPrice, normalPriceCount, purePrice, sumPrice, sumPriceNew , rxFindCount} from "../../../../env";


const PreviewStTable = (props) => {
    const TableTitle=[
        {Id:1,Title:"دریف"},
        {Id:2,Title:"نام محصول"},
        {Id:3,Title:"برند"},
        {Id:4,Title:"تعداد"},
        {Id:5,Title:"فی"},
        {Id:6,Title:"تخفیف"},
        {Id:7,Title:"قیمت کل"}
    ]
    const content = props.content
    const actions= props.actions
    
    console.log(content)
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
            <div className="table-wrapper" style={{direction:"rtl"}}>
                <table className="acc-table">
                    <thead>
                        <tr>
                            {TableTitle.map((th)=>(
                                <th key={th.Id}>{th.Title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {content.items&&content.items.map((item,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.productDetail[0].title}</td>
                                <td>{item.brand}</td>
                                <td>{item.count}</td>
                                <td>{normalPrice(item.price)}</td>
                                <td></td>
                                <td>{normalPrice(item.totalPrice)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>جمع کل</td>
                            <td>{content.data&&content.data.totalCount}</td>
                            <td></td>
                            <td>مبلغ کل</td>
                            <td>{content.data&&normalPrice(content.data.totalPrice)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        {/* <div className='actionBtn'>
            {actions&&actions.map((btn,i)=>(
                <input className={`${btn.title=="لغو"?"cancel-btn":""} preview-btn`} type='button' value={btn.title} key={i}
                onClick={()=>actionbtn(btn.value)} />
            ))}
        </div> */}
        </div>
    )
}

export default PreviewStTable

