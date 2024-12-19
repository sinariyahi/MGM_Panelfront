import { useEffect, useState } from "react";
// import ButtonLoader from "../../Components/BtnLoader";
import env, { normalPrice, normalPriceCount, purePrice, sumPrice, sumPriceNew , rxFindCount} from "../../../env";


// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import PreviewStockTable from "./PreviewStockTable";
import PreviewStTable from "../Standard/Popup/PreviewStTable";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const token=cookies.get(env.cookieName)

function PreViewStock(props){
    const url = props.Stocknum
    const [Content,setContent] = useState('')
    const [AcContent,setAcContent] = useState('')
    const [actions,setActions] = useState('')
    const [orderNo,setOrderNo] = useState('')
    

    useEffect(() => {
      setContent("")
      setActions("")
      setOrderNo("")
      setAcContent("")
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
              "x-access-token":token&&token.token,"userid":token&&token.userId},
          body:JSON.stringify(url.includes("S")?{stockOrderNo:url}:{orderNo:url})
        }
    fetch(env.siteApi +(url.includes("S")? "/order/fetch-stock":"/xtra/fetch-order"),postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(url.includes("S")){
        setContent(result.classResult)
        setActions(result.statusActions)
        setOrderNo(result.stockOrderNo)
        }else{
          setAcContent(result)
        }
      
      
      }
        )
        
      },
      (error) => {
        console.log(error);
      }
    ,[])
  
    return(
        <div class="preview-rx">
          {url.includes("S")?<PreviewStockTable Stocknum={url} content={Content} orderNo={orderNo}
            access={props.access} actions={actions} token={token}/>:
          <PreviewStTable AccNum={url} content={AcContent} orderNo={orderNo}
            access={props.access} actions={actions} token={token}/>}
        </div>
        
    )
}
export default PreViewStock