import { useEffect, useState } from "react"
import UserTabs from "../UserComponent/UserTabs"
import UserBill from "./UserBill"
import UserGeneral from "./UserGeneral"
import UserNotif from "./UserNotif"
import UserSecurity from "./UserSecurity"
import UserSocial from "./UserSocial"
import errortrans from "../../../translate/error"
import tabletrans from "../../../translate/tables"
import env from "../../../env"
import UserAccess from "./UserAccess"
import UserClass from "./UserClass"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function UserDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [userData,setUserData] = useState()
  const [accessList,setAccess] = useState()
  const [profile,setProfile] = useState()
  const [tabIndex,setTabIndex] = useState(0)

  const token=cookies.get(env.cookieName)
  useEffect(() => {
    var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({userId:url}) 
      }
  fetch(env.siteApi + "/panel/user/fetch-user",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      setUserData(result.data)
      setAccess(result.profiles)
      setProfile(result.userProfile)
    },
      (error) => {
        console.log(error);
      }
  )   
    
  },[])
  console.log(tabIndex)
    return(
    <div className="account" style={{direction:direction}}>
      <h4><i className={`fa-solid fa-angle-${direction==="rtl"?"right":"left"}` }
          onClick={()=>window.location.href="/users"}></i>
          {tabletrans.account[lang]}</h4>
      <UserTabs tabIndex={tabIndex} setTabIndex={setTabIndex} lang={props.lang}/>

      <div className="pages-wrapper">
        {tabIndex===0?<UserGeneral direction={direction} lang={lang} token={token}
          userData={userData} accessList={accessList} profile={profile}/>:<></>}
        {tabIndex===1?<UserBill direction={direction} lang={lang}/>:<></>}
        {tabIndex===2?<UserNotif direction={direction} lang={lang}/>:<></>}
        {tabIndex===3?<UserSocial direction={direction} lang={lang}/>:<></>}
        {tabIndex===4?<UserSecurity direction={direction} lang={lang}/>:<></>}
        {tabIndex===5?<UserClass direction={direction} lang={lang}
          userData={userData}/>:<></>}
      </div>
    </div>
    )
}
export default UserDetailHolder