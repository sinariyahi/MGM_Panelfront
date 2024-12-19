import React, { useRef, useEffect, useState } from "react";
import env from "../../../env";
import Status from "../../Components/Status";
import errortrans from "../../../translate/error";
import tabletrans from "../../../translate/tables";
import formtrans from "../../../translate/forms";
import ProductName from "./ProductName";
import ProductSKU from "./ProductSku";
import ProductPrice from "./ProductPrice";

function ProductDetailHolder(props) {
  const url = window.location.pathname.split("/")[3];
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [error, setError] = useState({ errorText: "", errorColor: "brown" });

  const [W8, setW8] = useState(0);
  const [content, setContent] = useState("");
  const [brand, setBrand] = useState("");
  const [filters, setFilters] = useState("");
  const [changeFilters, setChangeFilters] = useState("");
  const [category, setCategory] = useState("");
  const [productChange, setProductChange] = useState("");

  useEffect(() => {
    //if(url==="new")return
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: url }),
    };

    fetch(env.siteApi + "/panel/product/fetch-product", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ errorText: result.error, errorColor: "brown" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else {
            setError({ errorText: "سرویس پیدا شد", errorColor: "green" });
            setCategory(result.categoryList);
            setBrand(result.brandList);
            setContent(result.filter);
            setChangeFilters(result.filter&&result.filter.filters);
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              2000
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  useEffect(() => {
    var defaultCat = "";
    try {
      defaultCat =
        content && content.category ? JSON.parse(content.category)._id : "";
    } catch {}
    //console.log(defaultCat)
    if (!productChange.category && !defaultCat) return;
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: productChange.category ? productChange.category : defaultCat,
      }),
    };
    //console.log(postOptions)
    fetch(env.siteApi + "/panel/product/list-filter", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ errorText: result.error, errorColor: "brown" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else {
            setError({ errorText: "سرویس پیدا شد", errorColor: "green" });
            //console.log(result)
            setFilters(result.filter);
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              2000
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, [productChange.category, content]);
  const saveProducts = (navigateBack) => {
    setW8(1)
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: url,
        ...productChange,
        filters: changeFilters,
      }),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/product/update-product", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ errorText: result.error, errorColor: "brown" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else {
            setError({ errorText: result.success, errorColor: "green" });
            window.location.href="/products/detail/"+result.result._id;
            if (navigateBack) {
              setTimeout(() => {
                window.history.back();
              }, 2000);
            }
            setW8(0)
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div className="new-item" style={{ direction: direction }}>
      <div className="create-product">
        <h4>{tabletrans.createProduct[lang]}</h4>
        {content || url === "new" ? (
          <div className="pages-wrapper">
            <ProductName
              direction={direction}
              lang={lang}
              content={content}
              productChange={productChange}
              setProductChange={setProductChange}
            />
            <ProductSKU
              direction={direction}
              lang={lang}
              content={content}
              productChange={productChange}
              setProductChange={setProductChange}
              brand={brand}
              category={category}
              filters={filters}
              changeFilters={changeFilters}
              setChangeFilters={setChangeFilters}
            />
            {/* <ProductPrice direction={direction} lang={lang} content={content} 
          productChange={productChange} setProductChange={setProductChange}/> */}
            <div className="create-btn-wrapper">
              {W8?<div className="save-btn">
                در حال پردازش ...
              </div>:<><div className="save-btn" onClick={() => saveProducts(false)}>
                {formtrans.saveChanges[lang]}
              </div>
              <div className="save-btn" onClick={() => saveProducts(true)}>
                {formtrans.saveAndClose[lang]}
              </div></>}
              <p>Publish</p>
              {/* <div className="save-btn" onClick={saveProducts}>
                {formtrans.saveChanges[lang]}
              </div> */}
              <div className="cancel-btn" onClick={() => window.history.back()}>
                {formtrans.cancel[lang]}
              </div>
            </div>
          </div>
        ) : (
          <div>{env.loader}</div>
        )}
      </div>
    </div>
  );
}
export default ProductDetailHolder;
