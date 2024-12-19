import env, { hasChild } from "../env";
import errortrans from "../translate/error";
import menutrans from "../translate/menuAccordion"
import React, { useState } from "react";
import tabletrans from "../translate/tables";
import { Scrollbars } from 'react-custom-scrollbars';

import MenuItems from "./MenuItems";
import { useEffect } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function SideBarAccordion(props){
    const url = window.location.pathname.split('/')[1]
    const menuList = menutrans
    const [allowMenu,setAllowMenu] = useState([])
    const token=cookies.get(env.cookieName)
    const logOff=()=>{
        const cookies = new Cookies();
        cookies.remove(env.cookieName,{ path: '/' });
       setTimeout(()=>(window.location.reload(),1000))
    }
    return(
        <aside className={
            `sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3
            ${props.lang.dir==="rtl"?" fixed-end me-3 rotate-caret bg-white ps ps__rtl":
            " fixed-start ms-3  bg-white"} ${props.MiniMenu?"":"mini-sidebar"}`}
            id="sidenav-main">
            <div className="sidenav-header">
            <i className="serviceIcon fas fa-close position-absolute end-0 top-0 "
            onClick={()=>props.setPinMenu(0)}/>
            {props.MiniMenu?<i onClick={()=>props.setMiniMenu(false)} className="fa-solid fa-caret-right mini-arrow"></i>:<i onClick={()=>props.setMiniMenu(true)} class="fa-solid fa-caret-left mini-arrow"></i>}
            <a className="navbar-brand m-20" href={menuList.title.href} target="_blank">
                <img src={"/img/MGM Lens.svg"} alt ={menuList.title[props.lang.lang]}/>
                
            </a>
            </div>
            <hr className="horizontal light mt-0 mb-2"/>
            <div className={`collapse navbar-collapse  w-auto 
                ${props.lang.dir==="rtl"?" ps ps__rtl ps--active-y":""}`} 
                id="sidenav-collapse-main">
            
            <Scrollbars
            renderView={(style,...props)=> 
                <div
                    className="box"
                    style={{...style}}
                    {...props}/>
            }
            renderThumbVertical={(style,...props)=> 
                <div
                    className="boxThumb"
                    style={{...style}}
                    {...props}/>
            }
            renderTrackVertical={(style,...props)=> 
                <div
                    className="boxTrack"
                    style={{...style}}
                    {...props}/>
            }
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}>
            <ul className="navbar-nav">
                
                {menuList?menuList.menu.map((menu,i)=>(
                    hasChild(menu,token.profile)?
                    <MenuItems menu={menu} key={i} domain={url}
                    lang={props.lang} profile={token.profile}
                    access={token.access}/>
                :<></>)):''}
                
            </ul>
            </Scrollbars>
            </div>
            <div className="sidenav-footer position-absolute w-100 bottom-0 ">
            <div className="mx-3">
                <a className="btn bg-gradient-secondary w-100" href="#" 
                onClick={logOff} type="button">{errortrans.logOut[props.lang.lang]}</a>
            </div>
            </div>
        </aside>
    )
}
export default SideBarAccordion