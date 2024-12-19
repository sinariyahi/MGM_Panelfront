import { useEffect, useState } from "react"
import env from "../../env"
import dashtrans from "../../translate/dashboard"

function DashBoardDaily(props){
  const [data,setData] = useState('')
  const token=props.token
    useEffect(() => {
      const postOptions={
          method:'get',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId
        }
        }
    fetch(env.siteApi + "/panel/lens/report-top",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error){
          if(result.error.includes("Invalid")){
            props.cookies.remove(env.cookieName,{ path: '/' });
            setTimeout(()=>(document.location.reload(),500))
          }
        }
        else{
          setData('')
          setTimeout(()=> setData(result),200)
        }
      },
      (error) => {
          console.log(error);
      }
      
  )},[])
  //console.log(data)
    return(
        <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                        <i className="fas fa-credit-card"></i>
                    </div>
                    <div className={props.direction==="ltr"?
                      "text-end pt-1":"text-start pt-1"}>
                        <p className="text-sm mb-0 text-capitalize">{dashtrans.todayRx[props.lang]}</p>
                        <h4 className="mb-0">{data&&data.rxCount}</h4>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-3">
                    <p className="mb-0">{dashtrans.weekRx[props.lang]}: 
                      <span className="text-success text-sm font-weight-bolder">
                      {data&&data.rxCountW}  
                      </span></p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
              <i className="fas fa-user"></i>
              </div>
              <div className={props.direction==="ltr"?
                      "text-end pt-1":"text-start pt-1"}>
                <p className="text-sm mb-0 text-capitalize">{dashtrans.todayStock[props.lang]}</p>
                <h4 className="mb-0">{data&&data.stockCount}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
              <p className="mb-0">{dashtrans.weekStock[props.lang]}: 
              <span className="text-success text-sm font-weight-bolder">
              {data&&data.stockCountW||0} </span></p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
              <i className="fas fa-user-plus"></i>
              </div>
              <div className={props.direction==="ltr"?
                      "text-end pt-1":"text-start pt-1"}>
                <p className="text-sm mb-0 text-capitalize">{dashtrans.todayFrame[props.lang]}</p>
                <h4 className="mb-0">{data&&data.frameCount||0}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
              <p className="mb-0"> {dashtrans.weekFrame[props.lang]}: 
              <span className="text-danger text-sm font-weight-bolder">
              {data&&data.frameCountW||0}</span></p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <i className="fas fa-money"></i>
              </div>
              <div className={props.direction==="ltr"?
                      "text-end pt-1":"text-start pt-1"}>
                <p className="text-sm mb-0 text-capitalize">{dashtrans.todayAcc[props.lang]}</p>
                <h4 className="mb-0">{data&&data.accCount||0}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
              <p className="mb-0">{dashtrans.weekAcc[props.lang]}: 
              <span className="text-success text-sm font-weight-bolder">
              {data&&data.accCountW||0} </span></p>
            </div>
          </div>
        </div>
      </div>
    )
}
export default DashBoardDaily