import { useEffect, useState } from "react";
// import ButtonLoader from "../../Components/BtnLoader";
import env, { normalPrice, normalPriceCount, purePrice, sumPrice, sumPriceNew , rxFindCount} from "../../../../env";


// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import PreviewStockTable from "./PreviewStTable";
import PreviewStTable from "./PreviewStTable";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const token=cookies.get(env.cookieName)

function PreViewStock(props){
    const url = props.Stocknum
    const [Content,setContent] = useState('')
    const [actions,setActions] = useState('')
    const [orderNo,setOrderNo] = useState('')
    

    useEffect(() => {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
              "x-access-token":token&&token.token,"userid":token&&token.userId},
          body:JSON.stringify({stockOrderNo:url})
        }
    fetch(env.siteApi + "/order/fetch-stock",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setContent(result.classResult)
        setActions(result.statusActions)
        setOrderNo(result.stockOrderNo)
        }
        )
        
      },
      (error) => {
        console.log(error);
      }
    ,[])
  
    return(
        <div class="preview-rx">
          <PreviewStockTable Stocknum={url} content={Content} orderNo={orderNo}
            access={props.access} actions={actions} token={token}/>
        </div>
        
    )
}
export default PreViewStock