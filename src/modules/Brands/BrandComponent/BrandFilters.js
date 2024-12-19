import StyleInput from "../../../components/Button/Input"
import StyleSelect from "../../../components/Button/AutoComplete"
import StyleDatePicker from "../../../components/Button/DatePicker"
import tabletrans from "../../../translate/tables"
import { useState } from "react"

function BrandFilters(props){
    const lang = props.lang
    const options = props.options
    return(
        <div className="user-filter">
            
          <div className="serach-input">
            <StyleInput title={tabletrans.productTitle[lang.lang]}
             direction={props.lang.dir} 
            action={(e)=>(e.length>3||e.length===0)&&props.setFilters(prevState => ({
              ...prevState,
              title:e
            }))}/>
            <StyleSelect title={tabletrans.productCategory[lang.lang]}
              direction={props.lang.dir}  label="title"
              options={options?options.categories:[]} 
              action={(e)=>props.setFilters(prevState => ({
                ...prevState,
                category:e?e._id:''
              }))}/>
            <StyleSelect title={tabletrans.brand[lang.lang]} 
              direction={props.lang.dir} label="title"
              options={options?options.brands:[]} 
              action={(e)=>props.setFilters(prevState => ({
                ...prevState,
                brand:e?e._id:''
              }))}/>
            {/*
            <StyleDatePicker title={tabletrans.selectDate[props.lang.lang]} class="filterComponent" 
              direction={props.lang.dir} local={props.lang.dir==="ltr"?"en":"fa"}
              action={(e)=>props.setFilters(prevState => ({
                ...prevState,
                date:e
              }))}/>
            */}
            <i className="tableIcon fas fa-ellipsis-v"></i>
          </div>
          <div className="option-sub">
            <div className="option">
              <i className="fa-solid fa-print fa-sm"></i>
              <p>Print</p>
            </div>
            <div className="option">
              <i className="fa-solid fa-file-import fa-sm"></i>
              <p>Import</p>
            </div>
            <div className="option">
              <i className="fa-solid fa-file-export fa-sm"></i>
              <p>Export</p>
            </div>
          </div>
        </div>
    )
}
export default BrandFilters