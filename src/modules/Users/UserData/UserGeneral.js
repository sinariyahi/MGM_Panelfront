import { useState } from "react"
import StyleInput from "../../../components/Button/Input"
import env from "../../../env"
import formtrans from "../../../translate/forms"
import UserAvatar from "../UserComponent/UserAvatar"
import ErrorShow from "../../../components/Button/ErrorShow"
import StyleSelect from "../../../components/Button/AutoComplete"
import StyleSelectMultiple from "../../../components/Button/SelectMultiple"
import ShowError from "../../../components/Modal/ShowError"

function UserGeneral(props){
  const userData = props.userData 
  const token=props.token
  const [formData, setFormData] = useState()
  const [group, setGroup] = useState([])
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  const saveChanges=() => {
    var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token": token&&token.token,
        "userId":token&&token.userId,
        "module":"Customers Manager"},
        body:JSON.stringify({
          userId:userData._id,
          ...formData
        })
      }
      console.log(postOptions)
  fetch(env.siteApi + "/panel/user/update-user",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.success)
      {
        setError({errorText:result.success,
          errorColor:"green"})
        setTimeout(()=>window.location.href="/users",2000)
      }
      else {
        setError({errorText:result.message,
          errorColor:"brown"})
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),3000)
      }
    },
      (error) => {
        console.log(error);
      }
  )   
    
  }
  if(!userData)
    return(<div className="general-page">{env.loader}</div> )
  else return(
        <div className="general-page">
          <UserAvatar />
          <div className="info-box">
            <div className="info-wrapper">
              <StyleInput title={formtrans.name[props.lang]} direction={props.direction} 
                defaultValue={userData.cName} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  cName:e
                }))}/>
              
              <StyleInput title={formtrans.emailAddress[props.lang]} direction={props.direction} 
                defaultValue={userData.email} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  email:e
                }))}/>
              
              <StyleInput title={formtrans.phoneNumber[props.lang]} direction={props.direction} 
                defaultValue={userData.mobile} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  mobile:e
                }))}/>

              <StyleInput title={formtrans.customercode[props.lang]} direction={props.direction} 
                defaultValue={userData.cCode} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  cCode:e
                }))}/>
              
              <StyleInput title={formtrans.meliCode[props.lang]} direction={props.direction} 
                defaultValue={userData.meli} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  meli:e
                }))}/>
              <StyleInput title={formtrans.address[props.lang]} direction={props.direction} 
                defaultValue={userData.address} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  address:e
                }))}/>
              
              <StyleInput title={formtrans.country[props.lang]} direction={props.direction} 
                defaultValue={userData.country} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  country:e
                }))}/>
              
              <StyleInput title={formtrans.state[props.lang]} direction={props.direction} 
                defaultValue={userData.state} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  state:e
                }))}/>
              <StyleInput title={formtrans.city[props.lang]} direction={props.direction} 
                defaultValue={userData.city} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  city:e
                }))}/>
                
              <StyleSelect title={formtrans.access[props.lang]} direction={props.direction} 
                defaultValue={props.profile?props.profile:''} class={"formInput"}
                options={props.accessList||[]}
                label={"profileName"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  profile:e?e._id:''
                }))}/>
              
              <div className="info-input"><label htmlFor="about">
                  {formtrans.about[props.lang]}</label>
              <textarea name="about"
                  id="about" onChange={(e)=>setFormData(prevState => ({
                    ...prevState,
                    about:e.target.value
                  }))}>{userData.about}</textarea>
              </div>
            </div>
            <div className="save-btn" onClick={saveChanges}>{formtrans.saveChanges[props.lang]}</div>
            
            {error&&error.errorText?
            <ShowError status={"WARNING"} title={"Message"} 
            text={error.errorText} linkText={""} style={{direction:"rtl"}}
            color={error.errorColor}/>:<></>}
            {/*<ErrorShow message={error.errorText} color={error.errorColor} />*/}
          </div>


        </div>
    )
}
export default UserGeneral