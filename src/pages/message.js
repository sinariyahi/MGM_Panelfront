import Cookies from "universal-cookie";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import tabletrans from "../translate/tables";
import MessageTable from "../modules/message/messageTable";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions

const cookies = new Cookies();

function Message(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [W8,setW8]=useState(0)
  const token = cookies.get(env.cookieName);

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  useEffect(() => {
    setLoading(1);
    const body = {
      offset: filters.offset || "0",
      pageSize: filters.pageSize || "10",
      // customer: filters.customer,
      // orderNo: filters.orderNo,
      // status: filters.status,
      // brand: filters.brand,
      // dateFrom: filters.date && filters.date.dateFrom,
      // dateTo: filters.date && filters.date.dateTo,
      access: "manager",
      status:	"unread",
      kind:"manager",
      user:"true"
    };
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(body),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/setting/log", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(0);
          setContent("");
          setTimeout(() => setContent(result), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters]);
  const updateUser=(userId,logId)=>{
    setW8(1)
    const postOptions={
        method:'post',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token && token.token,
          userId: token && token.userId,
        },
        body:JSON.stringify({id:userId,hesabfa:"new"})
    }
    const logOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({id:logId,status:"done",kind:token.access})
        }
    //console.log(logOptions)
    fetch(env.siteApi + "/panel/user/new-hesabfa",postOptions)
    .then(res => res.json())
    .then(
    (result) => {
        result&&fetch(env.siteApi + "/setting/log/update",logOptions)
        .then(res => res.json())
        .then(
        (result) => {
            
            setTimeout(()=>window.location.reload(),500)
            setW8(0)
        }
        )
    },
    (error) => {
        console.log(error);
    })
    
}
const updateLog=(logId)=>{
    const logOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({id:logId,status:"delete",kind:token.access})
        }
    fetch(env.siteApi + "/setting/log/update",logOptions)
    .then(res => res.json())
    .then(
    (result) => {
        setTimeout(()=>window.location.reload(),1000)
    },
    
    (error) => {
        console.log(error);
    })
}

  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.message[lang]+"("+content.size+")"}</p>
            
          </div>
        </div>
      </div>
      <div className="list-container">
        
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            content.log&&content.log.map((item,i)=>(
              <div className="message-wrapper" key={i}>
                <div className="title">{(i+1)+" - "+item.title}</div>
                <div className="description">{item.description}</div>
                <div className="date">
                  <span>{new Date(item.date).toLocaleTimeString('fa')}</span>
                  <span>-</span>
                  <span>{new Date(item.date).toLocaleDateString('fa')}</span>
                  
                  </div>
                <div className="action">
                  <button className="detail-btn" onClick={()=>window.location.href=("/customers/detail/"+item.user)}>جزئیات</button>
                  {W8?<button className="active-btn">در حال پردازش</button>:<button className="active-btn" onClick={()=>updateUser(item.user,item._id)}>فعال سازی مشتری</button>}
                </div>
                <i className="fa-solid fa-close close-btn" style={{color: "#ff0000",cursor: "pointer"}} onClick={()=>updateLog(item._id)}></i>
              </div>
            ))
          )}
        </div>
        <Paging
          content={content}
          setFilters={handleFilterChange}
          filters={filters}
          lang={props.lang}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
      </div>
    </div>
  );
}
export default Message;
