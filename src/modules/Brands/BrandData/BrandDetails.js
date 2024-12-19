import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"
import StyleSelect from '../../../components/Button/AutoComplete';
import Modal from '../../../components/Button/Modal';
import env from '../../../env';

function BrandDetails(props){
    const editorRef = useRef(null);
    const content=props.content
    const [factoryList,setFactoryList] = useState()
    const [manageFacory,setManageFactory] = useState(0)
    const [loader,setLoader] = useState(0)
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    useEffect(()=>{
      //if(manageFacory)return
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({})
      }
     
  fetch(env.siteApi + "/panel/product/list-factory",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.error){
      }
        else{
          setError({errorText:"سرویس پیدا شد",
            errorColor:"green"})
          setFactoryList(result.filter)
          setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
        }
        
    },
    (error) => {
      console.log(error);
    })
    },[loader])
    const addItem=(factory)=>{
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({title:factory})
      }
     
  fetch(env.siteApi + "/panel/product/edit-factory",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      
      if(result.error){
        setError({errorText:result.error,
          errorColor:"brown"})
        setTimeout(()=>setError({errorText:'',
          errorColor:"brown"}),3000)
      }
        else{
          setError({errorText:"سرویس پیدا شد",
            errorColor:"green"})
            setManageFactory(0)
          setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
        }
        
    },
    (error) => {
      console.log(error);
    })
    }
    const updateFactory=(index)=>{
      
      var tempArray = props.userFactory
      if(tempArray.length===1)
        props.setUserFactory([])
      else{
        tempArray.splice(index,1)
        props.setUserFactory(tempArray)
      }
      //props.userFactory
    }
    console.log(loader)
    return(
        <div className="serviceItem">
          <StyleInput title={formtrans.title[props.lang]+"(مانند: کداک)"} direction={props.direction} 
              defaultValue={content?content.title:''} class={"formInput"}
              action={(e)=>props.setBrandChange(prevState => ({
                ...prevState,
                title:e
              }))}/>
          <StyleInput title={formtrans.brandCode[props.lang]+" (مانند: kodak)"} direction={props.direction} 
              defaultValue={content?content.brandCode:''} class={"formInput"}
              action={(e)=>props.setBrandChange(prevState => ({
                ...prevState,
                brandCode:e
              }))}/>
          <StyleInput title={formtrans.purchaseContact[props.lang]} direction={props.direction} 
              defaultValue={content?content.purchaseContact:''} class={"formInput"}
              action={(e)=>props.setBrandChange(prevState => ({
                ...prevState,
                purchaseContact:e
              }))}/>
          <StyleInput title={formtrans.discountPerc[props.lang]} direction={props.direction} 
              defaultValue={content?content.purchase:''} class={"formInput"}
              action={(e)=>props.setBrandChange(prevState => ({
                ...prevState,
                purchase:e
              }))}/>
          <div className='new-member'>
          <StyleSelect title={formtrans.factory[props.lang]} direction={props.direction} 
              //defaultValue={content?content.brandCode:''} class={"formInput"}
              options={factoryList||[]} label={"title"||null}
              action={(e)=>props.userFactory?
                props.setUserFactory([ 
                ...props.userFactory,
                e
              ]):props.setUserFactory([e])}/>
              <div className="addClassBtn" onClick={()=>setManageFactory(1)}>
              <i className="fa-solid fa-cog"></i></div>
              
            </div>
          <div className='factoryList'>
            {(props.userFactory&&props.userFactory.length)&&props.userFactory.map
            ((factory,i)=>(
              <div className="factoryItem" key={i}
                onClick={()=>updateFactory(i)}>
                {factory?factory.title:''}
                <i className="fa-solid fa-remove"></i>
              </div>
            ))}
          </div>
          <div className="content">
            <Editor
              apiKey='qosmvwu6wq395cpq7ay8ud8j9d21cf4cdgkxwmpz317vpy2i'
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={content?content.fullDesc:''}
              onEditorChange={(e)=>props.setBrandChange(prevState => ({
                ...prevState,
                fullDesc:e
              }))}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </div>
          <textarea placeholder={formtrans.metaDescription[props.lang]} 
          defaultValue={content?content.description:''}
          onChange={(e)=>props.setBrandChange(prevState => ({
            ...prevState,
            description:e.target.value
          }))}/>
          {manageFacory?<Modal title={formtrans.factoryManage[props.lang]} 
            lang={props.lang} direction={props.direction} setLoader={setLoader}
            addItem={addItem} close={setManageFactory} token={props.token}
            options={factoryList} setFactoryState={props.setFactoryState} setFactoryCode={props.setFactoryCode} factoryState={props.factoryState}/>:<></>}
    </div>
    )
}
export default BrandDetails