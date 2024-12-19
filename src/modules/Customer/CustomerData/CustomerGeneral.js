import { useState, useEffect } from "react";
import StyleInput from "../../../components/Button/Input";
import env from "../../../env";
import formtrans from "../../../translate/forms";
import CustomerAvatar from "../CustomerComponent/CustomerAvatar";
import ErrorShow from "../../../components/Button/ErrorShow";
import ErrorAction from "../../../components/Modal/ErrorAction";
import StyleRadio from "../../../components/Button/Radio";
import StyleSelect from "../../../components/Button/AutoComplete";

function CustomerGeneral(props) {
  const userData = props.userData;
  const token = props.token;
  const [formData, setFormData] = useState({ active: "false" }); // Initialize active as a string
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });
  const [formalShow, setFormal] = useState(0);

  useEffect(() => {
    // Initialize formData.active with userData.active when userData changes
    if (userData && userData.active) {
      setFormData((prevState) => ({
        ...prevState,
        active: userData.active,
      }));
    } else if (userData && userData.false) {
      setFormData((prevState) => ({
        ...prevState,
        active: userData.active,
      }));
    }
  }, [userData]);

  const saveChanges = (navigateBack) => {
    var postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId: userData._id,
        ...formData,
      }),
    };
    fetch(env.siteApi + "/panel/user/update-user", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setError({ errorText: result.success, errorColor: "green" });
            if (navigateBack) {
              setTimeout(() => {
                window.history.back();
              }, 2000);
            }
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const formalCustomer = (e) => {
    var postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userData,
      }),
    };
    //console.log(postOptions)
    fetch(env.siteApi + "/panel/user/formal-customer", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.result) {
            setError({ errorText: result.message, errorColor: "green" });
            setTimeout(() => window.location.reload(), 3000);
          } else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const activityStatusHandler = () => {
    setFormData((prevState) => ({
      ...prevState,
      active: formData.active === "false" ? "true" : "false", // Toggle between "true" and "false"
    }));
  };
  const realOrJuridical = () => {
    setFormData((prevState) => ({
      ...prevState,
      activity: formData.activity === "false" ? "true" : "false", // Toggle between "true" and "false"
    }));
  };
  const Heasbfa = () => {
    var postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        id: userData._id,
        hesabfa:"new",
      }),
    };
    fetch(env.siteApi + "/panel/user/new-hesabfa", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ errorText: result.error, errorColor: "red" });
            
          }
          if(result.hesabfa)
          {
            setError({ errorText: "در حسابفا ثبت شد", errorColor: "green" });
          }
          else console.log(result);
        },
        (error) => {
          setError({ errorText: error, errorColor: "red" });
        }
      );
  };

  if (!userData) return <div className="general-page">{env.loader}</div>;
  else
    return (
      <div className="general-page">
        {/* <CustomerAvatar /> */}
        <div className="info-box">
          <div className="info-wrapper">
            <StyleInput
              title={formtrans.name[props.lang]}
              direction={props.direction}
              defaultValue={userData.cName}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  cName: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.fname[props.lang]}
              direction={props.direction}
              defaultValue={userData.sName}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  sName: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.emailAddress[props.lang]}
              direction={props.direction}
              defaultValue={userData.email}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.phoneNumber[props.lang]}
              direction={props.direction}
              defaultValue={userData.phone}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  phone: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.mobile[props.lang]}
              direction={props.direction}
              defaultValue={userData.mobile}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  mobile: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.EmergencyContact[props.lang]}
              direction={props.direction}
              defaultValue={userData.urgCall}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  urgCall: e,
                }))
              }
            />
            <StyleInput
              title={"بودجه"}
              direction={props.direction}
              defaultValue={userData.badget}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  badget: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.customercode[props.lang]}
              direction={props.direction}
              defaultValue={userData.cCode}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  cCode: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.credit[props.lang]}
              direction={props.direction}
              defaultValue={userData.credit}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  credit: e,
                }))
              }
            />
            <StyleInput
              title={formtrans.postalCode[props.lang]}
              direction={props.direction}
              defaultValue={userData.postalCode}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  postalCode: e,
                }))
              }
            />

            <StyleInput
              title={formtrans.meliCode[props.lang]}
              direction={props.direction}
              defaultValue={userData.meliCode}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  meliCode: e,
                }))
              }
            />

            {/* <StyleInput title={formtrans.country[props.lang]} direction={props.direction} 
                defaultValue={userData.country} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  country:e
                }))}/> */}

            <StyleInput
              title={formtrans.state[props.lang]}
              direction={props.direction}
              defaultValue={userData.state}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  state: e,
                }))
              }
            />
            
            
            <span style={{ whiteSpace: "pre-wrap" }}></span>

            <StyleInput
              title={formtrans.city[props.lang]}
              direction={props.direction}
              defaultValue={userData.city}
              class={"formInput"}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  city: e,
                }))
              }
            />

            {/* <StyleSelect
              title={"فعال/غیرفعال"}
              direction={props.direction}
              defaultValue={userData.active}
              class={"formInput"}
              options={["فعال", "غیرفعال"]}
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  active: e,
                }))
              }
            /> */}

            <StyleSelect
              title={formtrans.access[props.lang]}
              direction={props.direction}
              defaultValue={props.profile ? props.profile : ""}
              class={"formInput custome-input"}
              options={props.accessList || []}
              label={"profileName"}
              
              action={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  profile: e ? e._id : "",
                }))
              }
            />
            {!userData.cCode?<div className="save-btn active-btn" style={{margin:"15px"}} onClick={() => Heasbfa()}>
              فعال سازی مشتری
            </div>:<div className="dense-btn">
              <label htmlFor="view">
                {/* Text indicating the radio button */}
                {formtrans.status[props.lang]}
              </label>
              <input
                className="switch-input"
                type="checkbox"
                id="view"
                defaultChecked={userData.active === true ? true : false}
                onClick={activityStatusHandler}
              />
              <label
                htmlFor="view"
                className={true ? "switch-label" : "switch-label disable-label"}
              ></label>
            </div>}
            <span style={{ whiteSpace: "pre-wrap" }}></span>

            <div className="info-input">
              <label htmlFor="address">{formtrans.address[props.lang]}</label>
              <textarea
                name="address"
                id="address"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    Address: e.target.value,
                  }))
                }
              >
                {userData.Address}
              </textarea>
            </div>

            <div className="info-input">
              <label htmlFor="about">{formtrans.about[props.lang]}</label>
              <textarea
                name="about"
                id="about"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    about: e.target.value,
                  }))
                }
              >
                {userData.about}
              </textarea>
            </div>
          </div>
          {userData.agent ? (
            <div
              className="delete-user-btn formal-btn"
              onClick={() => setFormal(1)}
            >
              رسمی کردن مشتری
            </div>
          ) : (
            <></>
          )}
          {/* <div className="save-btn" onClick={saveChanges}>
            {formtrans.saveChanges[props.lang]}
          </div> */}
          <ErrorShow message={error.errorText} color={error.errorColor} />
          {formalShow ? (
            <ErrorAction
              title="رسمی کردن مشتری"
              color="darkslateblue"
              text="مشتری بعد از ثبت در سپیدار، به عنوان مشتری رسمی در خواهد آمد."
              close={() => setFormal(0)}
              buttonText="تایید"
              action={(e) => formalCustomer(e)}
            />
          ) : (
            <></>
          )}
          <div className="create-btn-wrapper">
            
            <div className="save-btn" onClick={() => saveChanges(false)}>
              {formtrans.saveChanges[props.lang]}
            </div>
            <div
              className="save-btn"
              style={{ marginLeft: 10 + "em" }}
              onClick={() => saveChanges(true)}
            >
              {formtrans.saveAndClose[props.lang]}
            </div>
          </div>
        </div>
      </div>
    );
}
export default CustomerGeneral;
