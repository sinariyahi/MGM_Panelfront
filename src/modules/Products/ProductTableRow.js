import React ,{ useState } from "react"
import Status from "../Components/Status"
import  env, { normalPriceCount, rxFindCount } from "../../env"
import ProductQuickDetail from "./ProductComponent/ProductQuickDetail"
import tabletrans from "../../translate/tables"

function ProductTableRow(props){
  const [openOption,setOpenOption] = useState(0)
  const [checkState,setCheckState] = useState(false)
  const activeAcc = props.index===props.detail
  const token = props.token
  const product=props.product
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });

  const deleteProduct = () => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json", 
      "x-access-token":token&&token.token,"userId":token&&token.userId},
      body: JSON.stringify({
        productId: product._id,
      }),
    };
    fetch(env.siteApi + "/panel/product/delete-product", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            props.setFilters({reload:1});
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
            
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const changeStatus = () => {
    var current = true
    if(product.active){
      current = false
    } else {
      current = true
    }
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json", 
      "x-access-token":token&&token.token,"userId":token&&token.userId},
        body: JSON.stringify({
          productId: product._id,
        active: current
      }),
    };
    fetch(env.siteApi + "/panel/product/update-product", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            props.setFilters({reload:1});
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
    return(<React.Fragment>
        <tr 
            className={activeAcc?"activeAccordion":"accordion"}>
            <td className="checkBoxStyle">
              <input type="checkbox" name="" id="" checked={checkState}
              onChange={(e)=>setCheckState(checkState?false:true)}/></td>
            
            <td>
              <div className="cu-avatar">
                  <img src={product?(env.siteApiUrl+product.imageUrl):''} 
                  alt={product?product.title:"default"}/>
                  <div className="cu-name" onClick={()=>
                  window.location.href="/products/detail/"+product._id}>
                    <p className="name">{product.title}</p>
                    <p className="email">{product.sku}</p>
                  </div>
                  {product.moreInformation?
                    <i className="fa fa-comment-o" title={product.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{product.catData?product.catData.title:''}</p>
                </div>
              </td>
              <td>
                <div className="order-num">
                  <p>{product.brandData?product.brandData.title:''}</p>
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{normalPriceCount(product.price)}</p>
                </div>
              </td>
              <td>
              <Status status={product.active} class={"order-status"} 
                  lang={props.lang}
                  changeStatus={changeStatus} // Passing the changeStatus function
                  text={product.active?tabletrans.activeText[props.lang]:tabletrans.deactiveText[props.lang]}
                  />
              </td>
            <td>
              <div className="more-btn">
              <i className={`tableIcon fas ${activeAcc?"fa-chevron-up":"fa-chevron-down"}`} 
                onClick={()=>props.showDetail(activeAcc?"-1":props.index)} ></i>
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/products/detail/"+product._id}></i>
                {/* <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(openOption?0:1)}></i> */}
              </div>
              {openOption?<div className="sub-more-menu">
                <div className="sub-option sub-delete" onClick={deleteProduct}>
                <i className="tableIcon fas fa-remove" style={{color: "#ff0000"}}></i>
                  <p>حذف</p>
                </div>
                <div className="sub-option sub-edit">
                  <i className="tableIcon fas fa-edit"></i>
                  <p>ویرایش</p>
                </div>
              </div>:<></>}
            </td>
          </tr>
          {activeAcc?<tr className="sub-order">
        <td colSpan="9"><ProductQuickDetail product={product}/></td></tr>
          :<React.Fragment></React.Fragment>}
          </React.Fragment>
    )
}
export default ProductTableRow