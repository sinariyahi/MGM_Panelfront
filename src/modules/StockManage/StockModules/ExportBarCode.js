import { useEffect, useState } from "react";
import env from "../../../env";
import formtrans from "../../../translate/forms";
function ExportBarCode(props){
    const [url,setUrl]= useState();
    console.log(props)
    const [error,setError] = useState('')
    const content = props.data&&props.data.in
    const getExport = () => {
        const postOptions={
            method:'post',
            headers: { 
            'Content-Type': 'application/json'},
            body:JSON.stringify({brand:content.brand,
                lenzIndex:content.lenzIndex,
                material:content.material})
        }
        console.log(postOptions)
        setError("در حال دریافت اطلاعات")
        fetch(env.siteApi+"/sepidar/barcode-export",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result);
            setError("فایل خروجی ایجاد شد")
                setUrl(result.url)
            },
            (error) => {
            console.log(error);
            
            }
        )
        .catch(error => {
            console.log(error)
        })

        }

    return(
        <div className="filter-wrapper filter-min">
            <small>{error}</small>
            {url?<input type="button" style={{margin: "10px"}} className="save-btn" 
                value={formtrans.download[props.lang]} onClick={()=>window.location.href=env.siteApiUrl+"/"+url}/>:
            <input type="button" style={{margin: "10px"}} className="save-btn" 
                value={formtrans.export[props.lang]} onClick={getExport}/>}
        </div>
    )
}
export default ExportBarCode