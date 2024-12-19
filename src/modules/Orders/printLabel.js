import { useState ,useEffect } from "react";
import env, { normalPrice } from "../../env";
import Barcode from 'react-barcode';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function PrintLabel(props){
  const orderNo = document.location.pathname.split('/')[2];
  const [LensInfo, setLensInfo] = useState('');
  const [OrderInfo, setOrderInfo] = useState('');
  const [Row, setRow] = useState('');
  
  const token=cookies.get(env.cookieName)
  
  useEffect(() => {
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userid":token&&token.userId},
          body:JSON.stringify({'search':orderNo,userId:""})
        }
        fetch(env.siteApi+"/order/rxSeprate/search",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              var tempInfo = result[0]
              setTimeout(()=> setLensInfo(result[0]),500)
              setTimeout(()=> setOrderInfo(result[0].rxData),500)
              // setRow(align=="R"?(tempInfo.odMain&&tempInfo.odMain.split(',')):(tempInfo.odMain&&tempInfo.osMain.split(',')))
              setTimeout(()=> window.print(),1000)
              setTimeout(()=> window.close(),1000)
              
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
      try{row01=LensInfo.odMain.split(',');}catch{}
    var row02="";
      try{ row02=LensInfo.osMain.split(',');}catch{}
    
    if(LensInfo)
    return(
        <>
          {row01?<div class="barcode-new stock-label">
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27} textAlign="left"/>
            </div>
            <div className="title"><strong>R-</strong>{OrderInfo.brandName+" "+OrderInfo.lenzIndex+" "+OrderInfo.material+" "+OrderInfo.lenzDesign+"-"+LensInfo.coverCode}</div>
            <div className="info-wrapper">
              <div className="info-item"><p>Sph:</p>
              <p>{row01[0]}</p></div>
              <div className="info-item"><p>Cyl:</p>
              <p>{row01[1]}</p></div>
              <div className="info-item"><p>Axis:</p>
              <p>{row01[2]}</p></div>
              <div className="info-item"><p>Add:</p>
              <p>{row01[3]}</p></div>
            </div>
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27} textAlign="left"/>
            </div>
          </div>:<></>}
          <div className="page-break"></div>
          {row02?<div class="barcode-new stock-label">
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27} textAlign="left"/>
            </div>
            <div className="title"><strong>L-</strong>{OrderInfo.brandName+" "+OrderInfo.lenzIndex+" "+OrderInfo.material+" "+OrderInfo.lenzDesign+"-"+LensInfo.coverCode}</div>
            <div className="info-wrapper">
              <div className="info-item"><p>Sph:</p>
              <p>{row02[0]}</p></div>
              <div className="info-item"><p>Cyl:</p>
              <p>{row02[1]}</p></div>
              <div className="info-item"><p>Axis:</p>
              <p>{row02[2]}</p></div>
              <div className="info-item"><p>Add:</p>
              <p>{row02[3]}</p></div>
            </div>
            <div class="barcodeNew flex-center">
              <Barcode value={orderNo} fontSize="12px"
                        width={2} textMargin={-2}
                        format="CODE128" height= {27} textAlign="left"/>
            </div>
          </div>:<></>}
        </>
    )
}
export default PrintLabel