import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"
import ClassUser from "../ClassData/ClassUsers"

function ClassQuickDetail(props){
    const classes = props.classes
    const [content,setContent] = useState('')
    const [users,setUsers] = useState('')
    const [policy,setPolicy] = useState('')
    useEffect(()=>{
        var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({classId:classes._id})
        }
       
    fetch(env.siteApi + "/panel/user/fetch-class",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error){
          console.log({errorText:result.error,
            errorColor:"brown"})
        }
          else{
              setContent(result.filter)
              setUsers(result.userClass)
              setPolicy(result.policyClass)
            
          }
          
      },
      (error) => {
        console.log(error);
      }
    )
      },[])
    return(
    <div className="sub-order-table">
        <div className="sub-row">
            <div className="sub-avatar">
            <div className="sub-avatar-container">
                <img src="/img/lenz01.jpg"
                alt={"sku.sku"}/>
                <div className="sub-info">
                <p className="sub-name">{classes.title}</p>
                <p className="sub-id"> {classes.description}</p>
                </div>
            </div>
            </div>
            <div className="sub-num">کد محصول</div>
            <div className="sub-price">{classes.sku}</div>
        </div>
        <div className="item-box">
         <ClassUser direction={props.direction} lang={props.lang} 
            content={content} users={users} readOnly={true}
            /> 
        </div>
        <div className="sub-row">
            <p dangerouslySetInnerHTML={{__html:classes.fullDesc}}></p>
        </div>
    </div>
    )
}
export default ClassQuickDetail