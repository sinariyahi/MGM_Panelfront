import { useState ,useEffect } from "react";
import persianDate from 'persian-date';
import env from "../../env";
import Preview from "./Preview";
import PreviewStock from "./PreviewStock";
var token = JSON.parse(localStorage.getItem('token-lenz'));

function PrintArea(props){
    const rxOrderNo = document.location.pathname.split('/')[3];
    const [orderInfo, setOrderInfo] = useState('');
    const [rxInfo , setRxInfo] = useState('')
    const type = rxOrderNo.charAt(0)==="S"?"Stock":"RX";
    persianDate.toCalendar('persian');
    const[pDate,setPDate] = useState('');
    const[pWeek,setPWeek] = useState('');
    const[color,setColor] = useState('');
    //console.log(pWeek)
    useEffect(() => {
      if(rxOrderNo!=="temp"&&type==="RX"){
          const postOptions={
            method:'post',
            headers: { 
              'Content-Type': 'application/json'},
            body:JSON.stringify({'rxOrderNo':rxOrderNo})
          }
          fetch(env.siteApi+"/order/fetch-order",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                setOrderInfo(result.data);
                
                setPDate(new persianDate(new Date(result.data.date)).format());
                setPWeek(new persianDate(new Date(result.data.date)).format().split(' ')[1].split(':'));
              },
              (error) => {
                console.log({error:error});
              }
            )
            .catch((error)=>{
              console.log(error)
            })
      }
      if(rxOrderNo==="temp"&&type==="RX"){
        const postOptions={
          method:'get',
          headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
        }
        fetch(env.siteApi+"/order/rxList",postOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setOrderInfo(result.rxData.find(item=>item.status==="initial"));
            setPDate(new persianDate(Date.now()).format());
            setPWeek(new persianDate(new Date(result.date)).format().split(' ')[1].split(':'));
          },
          (error) => {
            console.log({error:error});
          }
        )
        .catch((error)=>{
          console.log(error)
        })
        
      }
      if(type==="Stock"){
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
          body:JSON.stringify({'stockOrderNo':rxOrderNo})
        }
        fetch(env.siteApi+"/order/fetch-stock",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setOrderInfo(result);
              setPDate(new persianDate(new Date(result.date)).format());
              setPWeek(new persianDate(new Date(result.date)).format().split(' ')[1].split(':'));
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
      }
      fetch(env.siteApi+"/order/color")
      .then(res => res.json())
      .then(
      (result) => {
          //console.log(result)
          setColor(result)
      },
      (error) => {
          console.log(error);
      }
      )
      .catch((error)=>{
      console.log(error)
      })
          //window.scrollTo(0, 170);
      },[])
      useEffect(() => {
        if(!orderInfo) return
        const data = orderInfo.rxLenz?orderInfo.rxLenz.split(',')[2]:'';
        
        if(!data)return
        const postOptions={
          method:'post',
          headers: { 
            'Content-Type': 'application/json'},
            body:JSON.stringify({sku:data})
        }
        fetch(env.siteApi+"/order/manufacture/find",postOptions)
          .then(res => res.json())
          .then(
            (result) => {
                setRxInfo(result)
            },
            (error) => {
              console.log({error:error});
            }
          )
          .catch((error)=>{
            console.log(error)
          })
        //window.scrollTo(0, 170);
    },[orderInfo])
    //console.log(rxInfo)
    const printNow=()=>{
        window.print();
    }
    return(
        <div className="printArea">
          {orderInfo&&orderInfo.status.includes('cancel')?
            <img className="bluePrint" src={"/img/cancel.png"}/>
            :<></>}
            <div className="userInfo">
              <div className="userSection">
                <strong>مرکز تخصصی سفارشات نسخه ای</strong>
                <span className="mobileHide">www.MGMLens.com</span>
                <span className="mobileHide">کد: 15</span>
              </div>
              <div className="userSection">
                <h1>MGM Lens</h1>
              </div>
              <div className="userSection">
                <small>تاریخ: <b>{pDate&&pDate.split(' ')[0]}</b></small>
                <small>شماره سفارش: <b>{rxOrderNo}</b></small>
                
                <small>ساعت ثبت سفارش: <b>{`${pWeek[0]}:${pWeek[1]}`}</b></small>
              </div>
            </div>
            <h4 className="printError">{orderInfo&&orderInfo.status.includes('cancel')?
            orderInfo.status.split('|')[1]:''}</h4>
            {type==="RX"?<Preview defData={orderInfo} lenzDetail={rxInfo} colorList={color}/>:
              <PreviewStock defData={orderInfo} lenzDetail={rxInfo}/>}
            <p className="info"><span>توضیحات:</span>{orderInfo.description&&orderInfo.description}</p>

            {/* <div style={{width:"92%",margin:"auto"}}>
              <button className="printBtn" onClick={()=>printNow()}>چاپ A5</button>
              <button className="printBtn" onClick={()=>window.location.href="/status/"+rxOrderNo}>مشاهده سابقه</button>
              <button className="printBtn" onClick={()=>window.location.href="/fishprint/"+rxOrderNo}>فیش پرینت</button>
              <button className="printBtn" onClick={()=>window.location.href="/printStore/"+rxOrderNo}>حواله خروج</button>
            </div> */}
        </div>
    )
}
export default PrintArea