import { useEffect, useState } from "react";
import ImagePop from "./ImagePop";
import Barcode from 'react-barcode';
import env, { standardService } from "../../env";

function Preview(props){
    const lenzDetail = props.lenzDetail;
    const hesabLimit = props.hesabLimit?props.hesabLimit:0
    const [iDisplay , setIDisplay] = useState(-1)
    const [coverContent , setCoverContent] = useState('')
    const defData = props.defData;
    const options=props.print?[" "," ","SPH","CYL","AXIS","ADD","DIA"]:
        [" "," ","SPH","CYL","AXIS","ADD","DIA",
    "Base","Prism","جهت پریزم","DEC","PD"];
    const frameOptions=["HBox","VBox","BVD","DBL","ED","PT","FH","FFA","Base"]
    
    useEffect(() => {
        try{setCoverContent(
        props.colorList&&defData.coverCode&&
            props.colorList.cover.find(item=>item.option===defData.coverCode).content)
        }catch{}
    },[props.colorList])  

    var row01="";
   try{row01=defData.odMain&&defData.odMain!==",,,,"&&
        ["R"].concat(defData.odMain&&defData.odMain.split(',')).concat('')
             .concat(defData.odMore&&(!props.print)&&defData.odMore.split(','));}catch{}
    var row02="";
    try{ row02=defData.osMain&&defData.osMain!==",,,,"&&
        ["L"].concat(defData.osMain&&defData.osMain.split(',')).concat('')
             .concat(defData.osMore&&defData.osMore.split(','));}catch{}
    const frameRow=defData&&defData.frameSize&&defData.frameSize.split(',');//["","-","-","-","-","-","-","-","-"];
    console.log(lenzDetail)
    //console.log(defData.NazokTigh)
    return(
        <div className={!props.print?"orderDataHolder":"orderDataHolder fishHolder"}>
            {/*env.touch*/}
            <div className="tableHolder">
                <table className={!props.print?"orderTable":"orderTable fishTable"} style={{direction:"ltr"}}>
                <tbody>
                    <tr>
                        {options.map((th,i)=>(
                          (!hesabLimit||i<6)?  
                        <th key={i}>{th}</th>:<></>))}
                        {hesabLimit?
                        <th>PD</th>:<></>}
                    </tr>
                    {row01?<tr>
                        <td onClick={()=>window.open("/printLabelRx/"+defData.rxOrderNo+
                            `?align=${row01[0]}&sph=${row01[1]}&cyl=${row01[2]}&axis=${row01[3]?row01[3]:""}&add=${row01[4]?row01[4]:""}&title=${lenzDetail.brandName.toUpperCase()+"-"+
                                lenzDetail.lenzIndex+"-"+lenzDetail.material}`
                            )}>
                            <i class="fas fa-tag"></i>
                        </td>
                        {row01.map((td,i)=>(
                            (!hesabLimit||i<6)&&
                        <td key={i}>{td?td:i===2?"0.00":""}</td>))}
                        <td>{frameRow&&frameRow[4]}</td>
                    </tr>:<></>}
                    {row02?<tr>
                        <td onClick={()=>window.open("/printLabelRx/"+defData.rxOrderNo+
                            `?align=${row02[0]}&sph=${row02[1]}&cyl=${row02[2]}&axis=${row02[3]?row02[3]:""}&add=${row02[4]?row02[4]:""}&title=${lenzDetail.brandName.toUpperCase()+"-"+
                                lenzDetail.lenzIndex+"-"+lenzDetail.material}`
                            )}>
                            <i class="fas fa-tag"></i>
                        </td>
                        {row02&&row02.map((td,i)=>(
                            (!hesabLimit||i<6)&&
                        <td key={i}>{td?td:i===2?"0.00":""}</td>))}
                        <td>{frameRow&&frameRow[4]}</td>
                    </tr>:<></>}
                </tbody>
            </table></div>
            {lenzDetail?<div className="tableHolder">
                <table className={!props.print?"orderTable":"orderTable fishTable"} style={{direction:"ltr"}}>
                <tbody>
                    <tr className="title-tr" style={{height:"40px"}}>
                        <td width="75%" style={{direction: "ltr"}}>
                            {lenzDetail.facoryName + " | "+
                            lenzDetail.lenzType + " | "+
                            lenzDetail.lenzDesign + " | "+
                            lenzDetail.lenzIndex + " | "+
                            lenzDetail.material} </td>
                        <td width="25%">{props.print?"عدسی":"نوع و مشخصات عدسی"}</td>
                    </tr>
                </tbody>
            </table></div>:<></>}
            {(!props.print)&&<div className="tableHolder"><table className="orderTable" style={{marginTop:"8px"}}>
                <tbody>
                    <tr className="title-tr">
                        {frameOptions.map((th,i)=>(
                            (!hesabLimit||i<4)&& 
                            <th key={i}>{th}</th>))}
                        {defData&&defData.brand&&<td style={{fontSize: "25px"}} rowSpan="2">{defData.brand}</td>}
                        {defData&&defData.coridor&&<td  rowSpan="2" dangerouslySetInnerHTML={{__html:
                        defData.coridor?("کریدور<br/> "+defData.coridor):""}}></td>}
                    </tr>
                    {frameRow?<tr>
                        <td id="HBOX">{frameRow[0]}</td>
                        <td id="VBOX">{frameRow[1]}</td>
                        <td id="BVD">{frameRow[5]}</td>
                        <td id="DBL">{frameRow[2]}</td>
                        {!hesabLimit&&
                        <><td id="ED">{frameRow[8]}</td>
                        <td id="PT">{frameRow[6]}</td>
                        <td id="FH">{frameRow[3]}</td>
                        <td id="FFA">{frameRow[7]}</td>
                        <td id="Base">{frameRow[9]}</td></>}
                        
                    </tr>:<></>}
                </tbody>
            </table></div>}
            <div className="tableHolder">
                <table className={!props.print?"orderTable":"orderTable fishTable"} style={{marginTop:"8px"}}>
                <tbody className="mobileTbody">
                    <tr className="mobileGrid">
                        {!props.print&&<>
                            <td>مصرف کننده: {defData&&defData.consumer}</td>
                            <td>نوع فریم: {defData&&defData.frameType}</td></>}
                        <td style={{direction:"rtl"}}>پوشش: {defData&&defData.coverCode}
                        ({coverContent})
                        </td>
                    </tr>
                </tbody>
            </table></div>
            {!props.print?<table className="orderTable" style={{marginTop:"8px"}}>
                <tbody>
                    <tr style={{height:props.print?"inherit":"60px",textAlign:"right",direction:"rtl",padding:"10px",
                        display:props.print?"grid":"inherit"}}>
                        <td width={props.print?"90%":"60%"} className="moreInfoStyle">
                            {defData?<span>
                                {defData.expressPrice?("ارسال فوری - "):''}
                                {defData.checkPrice?("بررسی مجدد "):''}<br/>
                                {defData.visionFit?("visionFit: "+defData.visionFit):''}<br/>
                                {defData.prior?("اولویت دید: "+defData.prior):''}<br/>
                                {defData.colorCode?("رنگ: "+defData.colorCode):''}<br/>
                            {defData.mirrorCode?("میرور: "+defData.mirrorCode):''}<br/>
                            {defData.NazokTigh&&defData.NazokTigh!=="\"\""?(<span>خدمات: <br/>
                                {standardService(defData.NazokTigh)}</span>):''}<br/>
                            </span>:<></>}<hr/>
                            {defData&&defData.moreInformation}</td>
                        {props.defData?<td style={{minWidth:"230px"}}><Barcode value={props.defData&&props.defData.rxOrderNo} 
                    format="CODE128" height= {60}/></td>:''}
                    </tr>
                </tbody>
            </table>:
            <div className="orderTable fishTable"><span>
                توضیحات: {defData&&defData.moreInformation}</span>
                {defData?<small>
                    {defData.prior?("<br/>اولویت دید: "+defData.prior):''}
                    {defData.colorCode?("<br/>رنگ: "+defData.colorCode):''}
                    {defData.mirrorCode?("<br/>میرور: "+defData.mirrorCode):''}
                    {(defData.NazokTigh&&defData.NazokTigh!=="")?
                    ("<br/>خدمات: "+standardService(defData.NazokTigh)):''}
                            </small>:<></>}
            </div>}
            {!props.print&&defData?<div className="" style={{marginTop:"10px",minHeight:"20px"}}>
                {defData.frameImg&&defData.frameImg.split(',').map((imgSrc,i)=>(

                imgSrc&&<img key={i} className='imgPreview' src={imgSrc} onClick={()=>setIDisplay(imgSrc)}/>))}
                <ImagePop setIDisplay={setIDisplay} iDisplay={iDisplay}  />
                
            </div>:<></>}
        </div>
    )
}
export default Preview