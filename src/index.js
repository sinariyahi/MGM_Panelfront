import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/App.css';
import './css/fontAwesome.css';
import './css/salimi.css';
import './css/reyham.css';
import './css/board.css';
import './css/responsive.css';
import './css/order.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Login from './pages/Login';
import Users from './pages/Users';
import NewUsers from './pages/NewUsers';
import Cookies from 'universal-cookie';
import errortrans from './translate/error';
import LayoutLogin from './components/LayoutLogin';
import env from './env';
import UserDetailHolder from './modules/Users/UserData/UserDetailHolder';
import CustomerDetailHolder from './modules/Customer/CustomerData/CustomerDetailHolder';

import Orders from './pages/Orders';
import CanOrders from './pages/CanOrders';
import Lathe from './pages/lathe';
import OrderDetailHolder from './modules/Orders/OrderData/OrderDetailHolder';
import Profile from './pages/Profile';
import Services from './pages/Services';
import ServiceDetailHolder from './modules/Service/ServiceData/ServiceDetailHolder';
import Products from './pages/Products';
import ProductDetailHolder from './modules/Products/ProductData/ProductDetailHolder';
import Brands from './pages/Brands';
import BrandDetailHolder from './modules/Brands/BrandData/BrandDetailHolder';
import Category from './pages/Category';
import CatDetailHolder from './modules/Category/CatData/CatDetailHolder';
import Reports from './pages/Reports';
import FindBug from './modules/Report/FindBug';
import CRM from './pages/Crm';
import AccessHolder from './modules/AccessControl/AccessHolder';
import ProfileAdd from './modules/AccessControl/ProfileAdd';
import FilterHolder from './modules/Filters/FilterHolder';
import FilterAdd from './modules/Filters/FilterAdd';
import Classes from './pages/Classes';
import Policy from './pages/Policy';
import PolicyDetailHolder from './modules/Policy/PolicyData/PolicyDetailHolder';
import ClassDetailHolder from './modules/Classes/ClassData/ClassDetailHolder';
import StockManage from './pages/StockManage';
import Landing from './pages/Landing';
import CRMList from './modules/Crm/CRMList/crmList';
import CRMAdd from './modules/Crm/CRMList/crmAdd';
import Discount from './pages/Discount';
import Sample from './pages/Sample';
import AccessUser from './pages/access-user';
import Garantee from './pages/garantee';
import StockHolder from './modules/Orders/StockOrder/StockHolder';
import PrintGurantee from "./modules/Orders/printGurantee";
import PrintGuranteeStock from "./modules/Orders/printGuranteeStock";
import PrintGuranteeRx from "./modules/Orders/printGuranteeRx";
import PrintLabel from "./modules/Orders/printLabel";
import PrintArea from "./modules/Orders/PrintArea";
import PreviewRx from "./modules/Orders/orderPreview/PreViewRX";
import message from "./pages/message"
import Message from './pages/message';
const cookies = new Cookies();
const style = document.getElementById('style-direction');
var lang = JSON.parse(localStorage.getItem(env.cookieLang));
/*if (lang.dir === 'rtl') {
  style.href = '/css/rtl.css';
} */
if(!lang){
  localStorage.setItem(env.cookieLang,JSON.stringify(
    { lang:errortrans.defaultLang,
      dir:errortrans.defaultDir,
      color:errortrans.defaultColor}));
  lang = JSON.parse(localStorage.getItem(env.cookieLang));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    {cookies.get(env.cookieName)?
      <Routes>
        <Route path="/" element={<Layout><Landing lang={lang}/></Layout>}/>
        <Route path="/login" element={<Layout><Profile lang={lang}/></Layout>}/>
        <Route path="/sample" element={<Layout><Sample lang={lang}/></Layout>}/>
        <Route path="/dashboard" element={<Layout><Dashboard lang={lang}/></Layout>}/>
        <Route path="/Garantee/:orderId" element={<Layout><Garantee lang={lang}/></Layout>}/>
        <Route path="/Garantee" element={<Layout><Garantee lang={lang}/></Layout>}/>
        
        <Route path="/crm" element={<Layout><CRM crm="mainCrm" lang={lang}/></Layout>}/>
        <Route path="/crm-orders" element={<Layout><CRM crm="orders" lang={lang}/></Layout>}/>
        <Route path="/crmlist" element={<Layout><CRMList lang={lang}/></Layout>}/>
        <Route path="/crmlist/detail/:crmId" element={<Layout><CRMAdd lang={lang}/></Layout>}/>


        <Route path="/messages" element={<Layout><Message lang={lang}/></Layout>}/>
        <Route path="/users" element={<Layout><Users lang={lang}/></Layout>}/>
        <Route path="/user" element={<Layout><AccessUser lang={lang}/></Layout>}/>
        <Route path="/newusers" element={<Layout><NewUsers lang={lang}/></Layout>}/>
        <Route path="/users/detail/:userId" element={<Layout><UserDetailHolder lang={lang}/></Layout>}/>
        <Route path="/customers/detail/:userId" element={<Layout><CustomerDetailHolder lang={lang}/></Layout>}/>

        <Route path="/access" element={<Layout><AccessHolder lang={lang}/></Layout>}/>
        <Route path="/access/detail/:profileId" element={<Layout><ProfileAdd lang={lang}/></Layout>}/>
        <Route path="/filter" element={<Layout><FilterHolder lang={lang}/></Layout>}/>
        <Route path="/filter/detail/:filtereId" element={<Layout><FilterAdd lang={lang}/></Layout>}/>
        <Route path="/print-guaranteeStock/:orderId" element={<PrintGuranteeStock />} />
        <Route path="/print-guaranteeRx/:orderId" element={<PrintGuranteeRx />} />
        <Route path="/print-guarantee" element={<PrintGurantee />} />
        <Route path="/printLabel/:orderId/" element={<PrintLabel />} />

        <Route path="/orders" element={<Layout><Orders lang={lang}/></Layout>}/>
        <Route path="/cancelorders" element={<Layout><CanOrders lang={lang}/></Layout>}/>
        <Route path="/LatheService" element={<Layout><Lathe lang={lang}/></Layout>}/>
        <Route path="/orders/detail/:orderId" element={<Layout><OrderDetailHolder lang={lang}/></Layout>}/>
        <Route path="/orders/detail/previewRx/:orderId" element={<PreviewRx lang={lang}/>}/>
        <Route path="/orders/print/:orderId" element={<PrintArea lang={lang}/>}/>
        <Route path="/orders/stock/:orderId" element={<Layout><StockHolder lang={lang}/></Layout>}/>
        <Route path="/stock" element={<Layout><StockManage lang={lang}/></Layout>}/>
        <Route path="/stock/detail/:orderId" element={<Layout><OrderDetailHolder lang={lang}/></Layout>}/>

        <Route path="/services" element={<Layout><Services lang={lang}/></Layout>}/>
        <Route path="/services/detail/:orderId" element={<Layout><ServiceDetailHolder lang={lang}/></Layout>}/>
        <Route path="/products" element={<Layout><Products lang={lang}/></Layout>}/>
        <Route path="/products/detail/:orderId" element={<Layout><ProductDetailHolder lang={lang}/></Layout>}/>

        <Route path="/brands" element={<Layout><Brands lang={lang}/></Layout>}/>
        <Route path="/brands/detail/:orderId" element={<Layout><BrandDetailHolder lang={lang}/></Layout>}/>
        <Route path="/category" element={<Layout><Category lang={lang}/></Layout>}/>
        <Route path="/category/detail/:orderId" element={<Layout><CatDetailHolder lang={lang}/></Layout>}/>
        <Route path="/class" element={<Layout><Classes lang={lang}/></Layout>}/>
        <Route path="/Discount" element={<Layout><Discount lang={lang}/></Layout>}/>
        <Route path="/class/detail/:orderId" element={<Layout><ClassDetailHolder lang={lang}/></Layout>}/>
        <Route path="/policy" element={<Layout><Policy lang={lang}/></Layout>}/>
        <Route path="/policy/detail/:orderId" element={<Layout><PolicyDetailHolder lang={lang}/></Layout>}/>
        
 
        <Route path="/reports" element={<Layout><Reports lang={lang}/></Layout>}/>
        <Route path="/find-bugs" element={<Layout><FindBug lang={lang}/></Layout>}/>
        <Route path="/sample" element={<Layout><Sample lang={lang}/></Layout>}/>
        

      </Routes>:
        <Routes>
          <Route path="/" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
          <Route path="/:auth" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
          <Route path="/:page/:auth" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
          <Route path="/:page/:page/:auth" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
        </Routes>}
     </Router>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
