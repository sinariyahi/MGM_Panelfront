import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"
import StyleSelect from '../../../components/Button/AutoComplete';
import Modal from '../../../components/Button/Modal';
import env from '../../../env';

function CatDetails(props){
    const editorRef = useRef(null);
    const content=props.content 
    const [brandList,setBrandList] = useState([])
    const [manageBrand,setManageBrand] = useState(0)
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    const updateBrand=(index)=>{
      
      var tempArray = props.userBrand
      if(tempArray.length===1)
        props.setUserBrand([])
      else{
        tempArray.splice(index,1)
        props.setUserBrand(tempArray)
      }
      //props.userFactory
    }
    useEffect(()=>{
      if(manageBrand)return
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({})
      }
     
  fetch(env.siteApi + "/panel/product/list-brands",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.error){
      }
        else{
          setError({errorText:"سرویس پیدا شد",
            errorColor:"green"})
          setBrandList(result.filter)
          setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
        }
        
    },
    (error) => {
      console.log(error);
    })
    },[manageBrand])
    const addItem=(brand)=>{
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({title:brand})
      }
     
  fetch(env.siteApi + "/panel/product/editBrand",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result)
      if(result.error){
        setError({errorText:result.error,
          errorColor:"brown"})
        setTimeout(()=>setError({errorText:'',
          errorColor:"brown"}),3000)
      }
        else{
          setError({errorText:"سرویس پیدا شد",
            errorColor:"green"})
            setManageBrand(0)
          setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
        }
        
    },
    (error) => {
      console.log(error);
    })
    }
    return(
        <div className="serviceItem">
          <StyleInput title={formtrans.title[props.lang]} direction={props.direction} 
              defaultValue={content?content.title:''} class={"formInput"}
              action={(e)=>props.setCatChange(prevState => ({
                ...prevState,
                title:e
              }))}/>
              <StyleInput title={formtrans.catCode[props.lang]} direction={props.direction} 
              defaultValue={content?content.catCode:''} class={"formInput"}
              action={(e)=>props.setCatChange(prevState => ({
                ...prevState,
                catCode:e
              }))}/>
              <div className='new-member'>
                <StyleSelect title={formtrans.brand[props.lang]} direction={props.direction} 
                    //defaultValue={content?content.brandCode:''} class={"formInput"}
                    options={brandList||[]} label={"title"||null}
                    action={(e)=>props.userBrand?props.setUserBrand([ 
                      ...props.userBrand,
                      e
                    ]):props.setUserBrand([e])}/>
                    <div className="addClassBtn" onClick={()=>setManageBrand(1)}>
                    <i className="fa-solid fa-cog"></i></div>
                  </div>
                <div className='factoryList'>
                  {(props.userBrand&&props.userBrand.length)&&props.userBrand.map
                  ((brand,i)=>(
                    <div className="factoryItem" key={i}
                      onClick={()=>updateBrand(i)}>
                      {brand?brand.title:''}
                      <i className="fa-solid fa-remove"></i>
                    </div>
                  ))}
                </div>
              <div className="content">
                <Editor
                  apiKey='qosmvwu6wq395cpq7ay8ud8j9d21cf4cdgkxwmpz317vpy2i'
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={content?content.fullDesc:''}
                  onEditorChange={(e)=>props.setCatChange(prevState => ({
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
              onChange={(e)=>props.setCatChange(prevState => ({
                ...prevState,
                description:e.target.value
              }))}/>
              {manageBrand?<Modal title={formtrans.brandManage[props.lang]} 
              lang={props.lang} direction={props.direction}
              addItem={addItem} close={setManageBrand}
              options={brandList}/>:<></>}
        </div>
    )
}
export default CatDetails