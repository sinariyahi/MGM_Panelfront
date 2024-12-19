import React, { useRef ,useEffect, useState} from 'react';
import StyleInput from '../../../components/Button/Input';
import tabletrans from '../../../translate/tables';
import ImageSimple from '../../../components/Button/ImageSimple';
import env from '../../../env';
import RichTextEditor from '../../../components/Button/RichTextEditor';

function ProductName(props){
    const content = props.content
    
    const [image,setImage]= useState();
    const [imageUrl,setImageUrl] = useState('')
    
    useEffect(() => {
      const postOptions={
          method:'post',
          headers: {
              "content-type": "application/json"
          },
          body:JSON.stringify({base64image:image&&image.base64,
                              imgName:image&&image.fileName,
                            folderName:"product"})
      }//URL.createObjectURL(image)
      //console.log(postOptions)
      image&&fetch(env.siteApi+"/panel/user/upload",postOptions)
          .then(res => res.json())
          .then(
          (result) => {
            props.setProductChange(prevState => ({
              ...prevState,
              imageUrl:result.url
            }))
          },
          (error) => {
              console.log(error);
          }
          )
          .catch((error)=>{
          console.log(error)
          })

      },[image])
    return(
        <div className="pd-row">
          <div className="row-title">
            <h4>{tabletrans.details[props.lang]}</h4>
            <p>{tabletrans.titleShort[props.lang]}</p>
          </div>
          <div className="row-box">
            <div className="details-wrapper">
                <StyleInput title={tabletrans.productName[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.title:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    title:e
                  }))}/>
                <StyleInput title={tabletrans.productSku[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.sku:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    sku:e
                  }))}/>
                  <div className='inLine'>
                <StyleInput title="hesabfa" direction={props.direction}
                 class={"formInput"} defaultValue={content?content.hesabfa:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    hesabfa:e
                  }))}/>
                <StyleInput title="hesabfa code 2/2" direction={props.direction}
                 class={"formInput"} defaultValue={content?content.hesabfa2:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    hesabfa2:e
                  }))}/>
                  
                <StyleInput title="hesabfa code 2/4" direction={props.direction}
                 class={"formInput"} defaultValue={content?content.hesabfa4:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    hesabfa4:e
                  }))}/>
                  
                <StyleInput title="hesabfa code 2/6" direction={props.direction}
                 class={"formInput"} defaultValue={content?content.hesabfa6:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    hesabfa6:e
                  }))}/>
            </div>
              <div className="contentTextEditor">
                <label htmlFor="name">{tabletrans.description[props.lang]}</label>
                <RichTextEditor content={content} value={"description"}
                  setProductChange={props.setProductChange} 
                  action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    description:e
                    }))} height={200}/>
              </div>
              <div className="contentTextEditor">
                <label htmlFor="name">{tabletrans.fullDescription[props.lang]}</label>
                <RichTextEditor content={content} value={"fullDesc"}
                  setProductChange={props.setProductChange} 
                  action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    fullDesc:e
                    }))}/>
              </div>
              <hr/>
              <div className="images">
                <h5>{tabletrans.images[props.lang]}</h5>
                <ImageSimple cardName="Input Image" imageGallery={[]} 
                    setImage={setImage} setImageUrl={setImageUrl} part={1}/>
                <img src={props.productChange.imageUrl?env.siteApiUrl+props.productChange.imageUrl:
                  (content?(env.siteApiUrl+content.imageUrl):'')} 
                  alt={content?content.title:env.default}/>
              </div>
            </div>
          </div>
        </div>
    )
}
export default ProductName