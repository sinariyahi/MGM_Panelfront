import errortrans from "../translate/error";
import reporttrans from "../translate/reports";

function Reports(props){
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    return(
        <div className="reports" style={{direction:direction}}>
      <div className="report-header">
        <h4>{reporttrans.reports[lang]}</h4>
        <div className="search-input">
          <i className="fa-solid fa-search fa-sm" style={{color: "#c0c0c0"}}></i>
          <input type="search" name="" id="" placeholder={reporttrans.searchreports[lang]}/>
        </div>
      </div>
      <div className="fav-report-wrapper">
        <div className="fav-title">
          <i className="fa-solid fa-bookmark fa-xl"></i>
          <p>My Favorites</p>
        </div>
        <div className="fav-reports">
          <div className="report">
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div><div className="report">
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
        </div>
      </div>
      <div className="report-wrapper">
        <div className="report-box">
          <div className="box-header">
            <i className="fa-solid fa-cart-shopping"></i>
            <h6>Sales</h6>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
        </div>
        <div className="report-box">
          <div className="box-header">
            <i className="fa-solid fa-cart-flatbed fa-sm"></i>
            <h6>Inventory</h6>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
        </div>
        <div className="report-box">
          <div className="box-header">
            <i className="fa-solid fa-money-bill-transfer fa-sm"></i>
            <h6>Receivables</h6>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
        </div>
        <div className="report-box">
          <div className="box-header">
            <i className="fa-regular fa-credit-card fa-sm"></i>
            <h6>Payment Received</h6>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
        </div>
        <div className="report-box">
          <div className="box-header">
            <i className="fa-solid fa-money-bill-transfer fa-sm"></i>
            <h6>Payables</h6>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
        </div>
        <div className="report-box">
          <div className="box-header">
            <i className="fa-solid fa-money-bill-transfer fa-sm"></i>
            <h6>Purchases and Expenses</h6>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
        </div>
        <div className="report-box">
          <div className="box-header">
            <i className="fa-solid fa-money-bill-transfer fa-sm"></i>
            <h6>activity</h6>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by Customer</p>
          </div>
          <div className="report">
            <i className="fa-regular fa-star no-fav" style={{color: "#c0c0c0"}}></i>
            <i className="fa-solid fa-star fav" style={{color: "#e3e300"}}></i>
            <p>Sales by item</p>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Reports