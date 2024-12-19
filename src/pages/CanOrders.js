import Cookies from "universal-cookie";
import StatusBar from "../modules/Components/StatusBar";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import tabletrans from "../translate/tables";

import CanOrderTable from "../modules/Orders/CanOrderTable";
import OrderFilters from "../modules/Orders/OrderComponent/OrderFilters";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import OrderTab from "../modules/Orders/OrderComponent/OrderTab";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions
const cookies = new Cookies();

function CanOrders(props){
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [content,setContent] = useState("")
    const [filters,setFilters] = useState("")
    const [loading,setLoading] = useState(0)
    const token=cookies.get(env.cookieName)
    useEffect(() => {
      setLoading(1)
      const body={
          offset:filters.offset?filters.offset:"0",
          pageSize:filters.pageSize?filters.pageSize:"10",
          customer:filters.customer,
          category:filters.category,
          orderNo:filters.orderNo,
          status:filters.status,
          brand:filters.brand,
          gurantee:filters.gurantee,
          expressPrice:filters.expressPrice,
          dateFrom:filters.date&&filters.date.dateFrom,
          dateTo:filters.date&&filters.date.dateTo,
          access:"manager"
      }
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify(body)
        }
        console.log(postOptions)
    fetch(env.siteApi + "/panel/order/list",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setLoading(0)
          setContent('')
          setTimeout(()=> setContent(result),200)
      },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters]);
  console.log(filters)
  //window.scrollTo(0, 270);},[pageNumber,filters,perPage,refreshTable])
  return (
    <div className="user" style={{ direction: direction }}>
      <h4>{tabletrans.ordercan[lang]}</h4>
      <div className="list-container">
        <OrderTab setFilters={handleFilterChange} filters={filters} />

        <OrderFilters
          lang={props.lang}
          setFilters={setFilters}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          options={content.brand}
          filters={filters}
        />
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            <CanOrderTable
              orders={content}
              lang={lang}
              category={filters.category}
            />
          )}
        </div>
        <Paging
          content={content}
          setFilters={setFilters}
          filters={filters}
          lang={props.lang}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
      </div>
    </div>
  );
}
export default CanOrders;
