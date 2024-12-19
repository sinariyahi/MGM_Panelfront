import { useState ,useEffect } from "react";
import env, { normalPrice } from "../../env";
import Barcode from 'react-barcode';

function PrintLabel(props){
  const orderNo = document.location.pathname.split('/')[2];
  const [LensInfo, setLensInfo] = useState('');
  
  useEffect(() => {
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
          body:JSON.stringify({'rxOrderNo':orderNo})
        }
        fetch(env.siteApi+"/order/fetch-order",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setTimeout(()=> setLensInfo(result.data),500)
              // setLensInfo(result);
              //totalValues(result.data.Result.InvoiceItems)
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
    
        //window.scrollTo(0, 170);
    },[])
    
    console.log(LensInfo)
    var row01="";
      try{row01=LensInfo.odMain&&LensInfo.odMain!==",,,,"&&
        ["R"].concat(LensInfo.odMain&&LensInfo.odMain.split(',')).concat('')
             .concat(LensInfo.odMore&&(!props.print)&&LensInfo.odMore.split(','));}catch{}
    var row02="";
      try{ row02=LensInfo.osMain&&LensInfo.osMain!==",,,,"&&
        ["L"].concat(LensInfo.osMain&&LensInfo.osMain.split(',')).concat('')
             .concat(LensInfo.osMore&&LensInfo.osMore.split(','));}catch{}
    
    if(LensInfo)
    return(
        <div className="barcode-wrapper">
          <div class="barcode-new stock-label">
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27}/>
            </div>
            <div className="title"><strong>{row01[0]}:</strong>title</div>
            <div className="info-wrapper">
              <div className="info-item"><p>Sph:</p>
              <p>{row01[1]}</p></div>
              <div className="info-item"><p>Cyl:</p>
              <p>{row01[2]}</p></div>
              <div className="info-item"><p>Axis:</p>
              <p>{row01[3]}</p></div>
              <div className="info-item"><p>Add:</p>
              <p>{row01[4]}</p></div>
            </div>
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27}/>
            </div>
          </div>
          <div class="barcode-new stock-label">
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27}/>
            </div>
            <div className="title"><strong>{row02[0]}:</strong>title</div>
            <div className="info-wrapper">
              <div className="info-item"><p>Sph:</p>
              <p>{row02[1]}</p></div>
              <div className="info-item"><p>Cyl:</p>
              <p>{row02[2]}</p></div>
              <div className="info-item"><p>Axis:</p>
              <p>{row02[3]}</p></div>
              <div className="info-item"><p>Add:</p>
              <p>{row02[4]}</p></div>
            </div>
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27}/>
            </div>
          </div>
        </div>
    )
}
export default PrintLabel