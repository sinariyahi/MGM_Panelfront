import React, { useState, useEffect, useRef } from "react";
import Status from "../Components/Status"
import  env, { normalPriceCount, rxFindCount } from "../../env"
import BrandQuickDetail from "./BrandComponent/BrandQuickDetail"
import Cookies from 'universal-cookie';
import tabletrans from "../../translate/tables"
import useCloseOnClickOutside from '../../hooks/useCloseOnClickOutside';



const cookies = new Cookies();

function BrandTableRow(props){

  const token=cookies.get(env.cookieName)

  const [openOption, setOpenOption] = useState(false); // Initialize to false by default
  const subMoreMenuRef = useRef(null);

  const [checkState,setCheckState] = useState(false)
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });

  const activeAcc = props.index===props.detail
  const brand=props.brand

  useCloseOnClickOutside(subMoreMenuRef, setOpenOption);


  useEffect(() => {
    // Function to close the submenu when clicking outside of it
    const handleClickOutside = (event) => {
        if (subMoreMenuRef.current && !subMoreMenuRef.current.contains(event.target)) {
            setOpenOption(false);
        }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener when component unmounts
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  
  const deleteBrand = () => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json", 
      "x-access-token":token&&token.token,"userId":token&&token.userId},
      body: JSON.stringify({
        brandId: brand._id,
      }),
    };
    fetch(env.siteApi + "/panel/product/delete-brand", postOptions)
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
    if(brand.active){
      current = false
    } else {
      current = true
    }
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json", 
      "x-access-token":token&&token.token,"userId":token&&token.userId},
        body: JSON.stringify({
        brandId: brand._id,
        active: current
      }),
    };
    fetch(env.siteApi + "/panel/product/update-brand", postOptions)
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
                  <img src={brand?(env.siteApiUrl+brand.brandUrl):''} 
                    alt={brand?brand.title:"default"}/>
                  <div className="cu-name" onClick={()=>
                  window.location.href="/brands/detail/"+brand._id}>
                    <p className="name">{brand.title}</p>
                    <p className="email">{brand.sku}</p>
                  </div>
                  {brand.moreInformation?
                    <i className="fa fa-comment-o" title={brand.moreInformation}></i>:<></>}
                </div>
              </td>
              <td>
                <div className="order-price">
                  <p>{brand.enTitle}</p>
                </div>
              </td>
              <td>
                <Status status={brand.active} class={"order-status"} 
                  lang={props.lang}
                  changeStatus={changeStatus} // Passing the changeStatus function
                  text={brand.active == true?tabletrans.activeText[props.lang]:tabletrans.deactiveText[props.lang]}
                  />
              </td>
            <td>
              <div className="more-btn">
              
                <i className="tableIcon fas fa-edit" onClick={()=>
                  window.location.href="/brands/detail/"+brand._id}></i>
                <i className="tableIcon fas fa-ellipsis-v" 
                  onClick={()=>setOpenOption(!openOption)}></i> {/* Toggle openOption */}
              </div>
              {openOption && (
                        <div ref={subMoreMenuRef} className="sub-more-menu">
                            <div className="sub-option sub-delete" onClick={deleteBrand}>
                                <i className="tableIcon fas fa-remove" style={{ color: "#ff0000" }}></i>
                                <p>{tabletrans.delete[props.lang]}</p>
                            </div>
                            <div className="sub-option sub-edit" onClick={() =>
                                window.location.href = "/brands/detail/" + brand._id}>
                                <i className="tableIcon fas fa-edit"></i>
                                <p>{tabletrans.edit[props.lang]}</p>
                            </div>
                        </div>
                    )}
            </td>
          </tr>
          
          </React.Fragment>
    )
}
export default BrandTableRow