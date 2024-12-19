import StyleSelect from "../../../components/Button/AutoComplete"
import StyleInput from "../../../components/Button/Input"
import tabletrans from "../../../translate/tables"
import React, { useState, useEffect } from 'react';
import { generateRandomString } from '../../../utils/utils.js'; 



function ProductSKU(props){
    const content = props.content
    const brand=props.brand&&props.brand.filter(item=>item.title)
    const filters=props.filters
    const category = props.category
    const defFilters = content?content.filters:''

console.log(brand)
  // Generate random sku and productCode
  const randomSku = generateRandomString(10)
  const randomProductCode = generateRandomString(10)

  // Set the state with random sku and productCode
  useEffect(() => {
      props.setProductChange(prevState => ({
          ...prevState,
          sku: randomSku,
          productCode: randomProductCode
      }))
  }, [])
    

    return(
        <div className="pd-row">
          <div className="row-title">
            <h4>{tabletrans.propertie[props.lang]}</h4>
            <p>{tabletrans.attributes[props.lang]}</p>
          </div>
          <div className="row-box">
            <div className="probs-wrapper">
              <div className="input-wrapper">
                {/* <StyleInput title={tabletrans.productCode[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.productCode:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    productCode:e
                  }))}/> */}
                {/* <StyleInput title={tabletrans.productSku[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.sku:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    sku:e
                  }))}/> */}

                <StyleSelect title={tabletrans.brand[props.lang]} direction={props.direction}
                 class={"formInput halfWidth"} defaultValue={content?JSON.parse(content.brand):''} 
                 options={brand?brand:[]} label={"title"}
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    brand:e?e._id:''
                  }))}/>
                  <StyleSelect title={tabletrans.category[props.lang]} direction={props.direction}
                 class={"formInput halfWidth"} defaultValue={content?JSON.parse(content.category):''} 
                 options={category?category:[]} label="title"
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    category:e?e._id:''
                  }))}/>
                {filters?filters.map((filter,i)=>(
                  <StyleSelect title={filter.title} direction={props.direction}
                  class={"formInput halfWidth"} defaultValue={defFilters&&defFilters[filter.enTitle]||''}
                  options={filter.optionsP?filter.optionsP:[]} 
                  action={(e)=>e&&props.setChangeFilters(prevState => ({
                     ...prevState,
                     [filter.enTitle]:e
                   }))} key={i}/>
                )):<></>}
                
                <StyleInput title={"قیمت"} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.price:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    price:e
                  }))}/>
                <StyleInput title={"2/2قیمت"} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.price2:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    price2:e
                  }))}/>
                  
                <StyleInput title={"2/4قیمت"} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.price4:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    price4:e
                  }))}/>
                  
                <StyleInput title={"2/6قیمت"} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.price6:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    price6:e
                  }))}/>
                <StyleInput title={"قیمت تراش"} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.tarashPrice:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    tarashPrice:e
                  }))}/>
                <div className="pd-tags info-input">
                  <label htmlFor="pd-tag">Tags</label>
                  <input type="text" name="" id="pd-tag"/>
                </div>

              </div>

            </div>
          </div>
        </div>
    )
}
export default ProductSKU