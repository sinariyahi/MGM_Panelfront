import { useEffect, useState } from "react";
// import ButtonLoader from "../../Components/BtnLoader";
import env, { normalPrice, normalPriceCount, purePrice, sumPrice, sumPriceNew , rxFindCount} from "../../../env";


// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import PreviewRXTable from "./PreviewRXTable";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const token=cookies.get(env.cookieName)

function PreViewRX(props){
    const url = props.Rxnum
    const [content,setContent] = useState('')
    const [user,setUser] = useState('')

    const [defData,setDefData] =useState('');
    const single = defData?(defData.odMain===",,,,"||defData.osMain===",,,,")?1:2:1
    const rawPrice=(defData&&defData.rxLenz)?defData.rxLenz.split(','):[0,0];
    const serPrice=0;

    const [data,setData] = useState(0)
    const [services,setServices] = useState(0)
    const [cylinder,setCylinder] = useState([])
    const [price,setPrice] = useState(["0","0"]);
    const [lenzDetail,setLenzDetail] = useState()
    const [color,setColor] = useState()
    const [moreService,setMoreService] = useState(0);
    const [offers,setOffers] = useState('')
    const [credit,setCredit] = useState('')
    const [repOrder,setRepOrder] = useState('')
    
    const [manager,setManager] = useState()
    const [selectedCustomer,setCustomer] = useState('')
    const [customerList,setCustomerList] = useState()

    useEffect(() => {
      var sku=''
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
              "x-access-token":token&&token.token,"userid":token&&token.userId},
          body:JSON.stringify({orderNo:url})
        }
    fetch(env.siteApi + "/order/rxlistInit",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        setDefData(result.rxData);
        setServices(result.services)
        setMoreService(result.rxData&&
          result.rxData.NazokTigh&&
          JSON.parse(result.rxData.NazokTigh))
        setCylinder(result.cylinder)
        setData(result)
        setRepOrder(result.reOrder)
          }
        )
        
      },
      (error) => {
        console.log(error);
      }
    ,[])
  
    return(
        <div class="preview-rx">
          <PreviewRXTable lenzDetail={data.lenzData} defData={defData}  colorList={color}
            services = {data.services} cylinder={cylinder} Rxnum={url} user={data.userData} access={props.access}/>
          <div className="factor-view">
            <div className="factor-main">
            {defData?<section className="sum-sec">
                  <div className="sum-box">
                    <ul className="r-list">
                    <li>قیمت محصول</li>
                    <li>هزینه پوشش</li>
                    <li>هزینه رنگ</li>
                    {moreService&&moreService.map((service,i)=>(
                      <li key={i}>
                        هزینه {service.title}
                      </li>
                    ))}
                    {cylinder&&cylinder.map((service,i)=>(
                      <li key={i}>
                        {service.title}
                      </li>
                    ))}
                    <li>تعداد: </li>
                    <li>جمع: </li>
                    <li>تخفیف: </li>
                    <li>جمع کل:</li>
                    </ul>
                    <ul className="l-list">
                    <li>{data?normalPrice(data.price):'-'}</li>
                    <li>{defData.coverPrice?normalPriceCount(defData.coverPrice,data.single):"-"}</li>
                    <li>{defData.colorPrice?normalPriceCount(defData.colorPrice,data.single):"-"}</li>
                    {moreService&&moreService.map((service,i)=>(
                      <li key={i}>
                        {normalPriceCount(service.price?service.price:"0",data.single)}
                      </li>
                    ))}
                    {cylinder&&cylinder.map((service,i)=>(
                      <li key={i}>
                        {service.price?normalPrice(service.price):'-'}
                      </li>
                    ))}
                    <li>{data.single}</li>
                    <li>{data?sumPriceNew(data.totalPrice,data.offer):'-'}</li>
                    <li>{data.offer?normalPrice(data.offer):'-'}</li>
                    <li>{data?normalPrice(data.totalPrice):'-'}</li>
                    
                    </ul>
                  </div>
                  <div className="sum-box">
                    <ul className="r-list">
                    <li>تاریخ ثبت:</li>
                    </ul>
                    <ul className="l-list">
                    <li>{new Date(defData.date).toLocaleDateString('fa')}</li>
                    </ul>
                  </div>
                    
                    
            </section> :<></>}
            </div>
          </div>
        </div>
        
    )
}
export default PreViewRX