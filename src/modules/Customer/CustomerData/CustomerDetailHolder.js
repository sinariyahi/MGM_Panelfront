import { useEffect, useState } from "react";
import CustomerTabs from "../CustomerComponent/CustomerTabs";
import errortrans from "../../../translate/error";
import tabletrans from "../../../translate/tables";
import env from "../../../env";
import CustomerBill from "./CustomerBill";
import CustomerNotif from "./CustomerNotif";
import CustomerSocial from "./CustomerSocial";
import CustomerSecurity from "./CustomerSecurity";
import CustomerGeneral from "./CustomerGeneral";
import CustomerSupplementary from "./CustomerSupplementary";
import CustomerClass from "./CustomerClass";
import Cookies from "universal-cookie";
const cookies = new Cookies();


function CustomerDetailHolder(props) {
  const token = cookies.get(env.cookieName);

  const url = window.location.pathname.split("/")[3];
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [userData, setUserData] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [accessList,setAccess] = useState()
  const [profile,setProfile] = useState()

  useEffect(() => {
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: url }),
    };
    fetch(env.siteApi + "/panel/user/fetch-user", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setUserData(result.data);
          setAccess(result.profiles);
          setProfile(result.userProfile);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <div className="account" style={{ direction: direction }}>
      <h4>
        <i
          className={`fa-solid fa-angle-${
            direction === "rtl" ? "right" : "left"
          }`}
          onClick={() => (window.location.href = "/users")}
        ></i>
        {tabletrans.account[lang]}
      </h4>
      <CustomerTabs tabIndex={tabIndex} setTabIndex={setTabIndex} lang={lang} />

      <div className="pages-wrapper">
        {tabIndex === 0 ? (
          <CustomerGeneral
            direction={direction}
            lang={lang}
            userData={userData}
            accessList={accessList}
            profile={profile}
            token={token}

          />
        ) : (
          <></>
        )}
        {tabIndex === 1 ? (
          <CustomerSupplementary
            direction={direction}
            lang={lang}
            userData={userData}
            accessList={accessList}
            profile={profile}
            token={token}

          />
        ) : (
          <></>
        )}
        {tabIndex === 2 ? (
          <CustomerBill direction={direction} lang={lang} />
        ) : (
          <></>
        )}
        {tabIndex === 3 ? (
          <CustomerNotif direction={direction} lang={lang} />
        ) : (
          <></>
        )}
        {tabIndex === 4 ? (
          <CustomerSocial direction={direction} lang={lang} />
        ) : (
          <></>
        )}
        {tabIndex === 5 ? (
          <CustomerSecurity
            direction={direction}
            lang={lang}
            userData={userData}
            token={token}

          />
        ) : (
          <></>
        )}
        {tabIndex === 6 ? (
          <CustomerClass
            direction={direction}
            lang={lang}
            userData={userData}
            token={token}

          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default CustomerDetailHolder;
