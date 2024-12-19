import { useEffect, useState } from "react"
import WeekStatistic from "./charts/WeekStatistic"
import RXChart from "./charts/RXChart"
import env from "../../env"
import StockChart from "./charts/StockChart"
import UserChart from "./charts/UserChart"
function DashboardChart(props){
    
    return(
        <div className="row mt-4">
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2 ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                <div className="chart">
                <RXChart lang={props.lang} direction={props.direction}
                  label={["","S","S","M","T","W","T","F"]}/>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 ">فروش RX</h6>
              <p className="text-sm ">سفارشات سفارشی ثبت شده در هفته</p>
              <hr className="dark horizontal"/>
              <div className="d-flex ">
                <i className="fas fa-history"></i>
                <p className="mb-0 text-sm"> مشاهده جزئیات سفارشات </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2  ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                <div className="chart">
                <StockChart lang={props.lang} direction={props.direction}
                  label={["","S","S","M","T","W","T","F"]}/>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 "> فروش Stock </h6>
              <p className="text-sm "> سفارشات استوک ثبت شده در هفته </p>
              <hr className="dark horizontal"/>
              <div className="d-flex ">
                <i className="fas fa-history"></i>
                <p className="mb-0 text-sm"> مشاهده جزئیات سفارشات </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4 mb-3">
          <div className="card z-index-2 ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                <div className="chart">
                <UserChart lang={props.lang} direction={props.direction}
                  label={["","S","S","M","T","W","T","F"]}/>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 ">واحدهای فروش</h6>
              <p className="text-sm ">ثبت سفارش کاربران فروش</p>
              <hr className="dark horizontal"/>
              <div className="d-flex ">
                <i className="fas fa-history"></i>
                <p className="mb-0 text-sm">مشاهده جزئیات فروش </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default DashboardChart