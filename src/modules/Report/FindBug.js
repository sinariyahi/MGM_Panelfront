import Cookies from 'universal-cookie';
import Paging from '../Components/Paging';
import errortrans from "../../translate/error";
import { useEffect } from 'react';
import { useState } from 'react';
import env from '../../env';
import BugTable from './BugFix/BugList';
import BugFilters from './BugFix/BugFilters';
const cookies = new Cookies();

function FindBug(props){
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [content,setContent] = useState("")
    const [filters,setFilters] = useState("")
    const [loading,setLoading] = useState(0)
    const token=cookies.get(env.cookieName)
    useEffect(() => {
      setLoading(1)
      const body={
        orderNo:filters.orderNo,
        dateFrom:filters.date&&filters.date.dateFrom,
        dateTo:filters.date&&filters.date.dateTo,
        offset:filters.offset?filters.offset:"0",
        pageSize:filters.pageSize?filters.pageSize:"10",
        }
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify(body)
        }
        console.log(postOptions)
    fetch(env.siteApi + "/panel/order/find-bugs",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setLoading(0)
          setContent('')
          setTimeout(()=> setContent(result),200)
      },
      (error) => {
        setLoading(0)
        console.log(error);
      }
      
  )},[filters])
  console.log(content)
  //window.scrollTo(0, 270);},[pageNumber,filters,perPage,refreshTable])
   return(
      <div className="user" style={{direction:direction}}>
      <h4>{errortrans.orders[lang]}</h4>
      <div className="list-container">
      <BugFilters lang={props.lang} setFilters={setFilters}
          options={content.brand} filters={filters}/>
       <div className="user-list">
          {loading?env.loader:<BugTable orders={content} lang={lang}/>}
        </div> 
        <Paging content={content} setFilters={setFilters} filters={filters} 
          lang={props.lang}/>
      </div>
    </div>
    )
}
export default FindBug