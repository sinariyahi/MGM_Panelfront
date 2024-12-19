import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"

function ClassPolicy(props){
    const content=props.content
    return(
        <div className="serviceItem">
          <strong>لیست سیاست های فروش</strong>
          <div className="factoryList policyList">
          {content&&content.map((policy,i)=>(
            <div className="factoryItem policyItem" key={i}>
              {policy.policyName}
              <i className="fa-solid fa-remove"></i>
            </div>
            ))} 
            </div>
        </div>
    )
}
export default ClassPolicy