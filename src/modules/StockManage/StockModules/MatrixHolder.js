import { useEffect, useState } from "react"
import Popup from "./Popup"

function MatrixHolder(props){
    const content = props.content
    const colHeader=content.cylList
    const rowHeader=content.sphList

    const [matrix,setMatrix]=useState()

    useEffect(()=>{
        setMatrix(content.matrixData)
    },[content.matrixData])

    const [popupShow,setPopupShow] = useState(0)
    const [xy,setXY] = useState([0,0])
    const popup=(e,x,y)=>{
        setXY([x,y])
        setPopupShow(e)
    }
    const updateMatrix=(newItem)=>{
        var tempMatrix = matrix
        if(newItem.active)
            tempMatrix[xy[0]][xy[1]].active=newItem.active
        if(newItem.price)
            tempMatrix[xy[0]][xy[1]].price=newItem.price
        setMatrix(tempMatrix)
        /*props.setFilters(preState=>({
            ...preState,
            update:Math.random()}))*/
    }
    //console.log(content)
    return(<>
    <table>
        <thead>
            <tr>
            <th></th>
            {colHeader&&colHeader.map((col,i)=>(
                <th style={{direction:"ltr"}} key={i}>{col}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {matrix&&matrix.map((row,i)=>(
              <tr key={i}>
                <td style={{direction:"ltr"}}>{rowHeader[i]?rowHeader[i]:''}</td>
                {row&&row.map((item,j)=>(
                    <td key={j}>
                        {item?<div onClick={(e)=>popup(item,i,j)} 
                            className={item.active==="false"?"disCube":"cube"}>
                        </div>:
                        <div className="noCube">
                        </div>}
                    </td>
                ))}
              </tr>
            ))}
        </tbody>
    </table>
    {popupShow?<Popup setPopupShow={setPopupShow} content={popupShow}
        lang={props.lang} updateMatrix={updateMatrix}/>:<></>}
    </>
    )
}
export default MatrixHolder