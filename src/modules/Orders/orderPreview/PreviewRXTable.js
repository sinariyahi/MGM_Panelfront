
function PreviewRXTable(props){
    const order = props.defData
    const lens = props.lenzDetail
    const user = props.user
    const access = props.access
    if(!order) return
    const odMain = order.odMain?
        order.odMain.split(','):[,,,,,]
    const osMain = order.osMain?
        order.osMain.split(','):[,,,,,]
    const odMore = order.odMore?
        order.odMore.split(','):[,,,]
    const osMore = order.osMore?
        order.osMore.split(','):[,,,]
    const frameSize = order.frameSize?
        order.frameSize.split(','):[,,,,,]
    const services = order.NazokTigh?JSON.parse(order.NazokTigh):''
    return(
        <body className="factor-view">
            <div className="factor-main">
                <section className="lens-sec">
                <div className="order-info">
                    <ul className="r-list">
                    <li>شماره سفارش:</li>
                    {(access=="full"||access=="edit")?<li>نام مشتری:</li>:<></>}
                    <li>فروشگاه/قبض:</li>
                    <li>شماره سفارش قبل:</li>
                    <li>نام بیمار:</li>    
                    </ul>
                    <ul className="l-list">
                    <li>{props.Rxnum}</li>
                    {(access=="full"||access=="edit")?<li>{user?user.cName:'MGM'}</li>:<></>}
                    <li>{order.ghabz?order.ghabz:'-'}</li>
                    <li>{order.oldOrderNo?order.oldOrderNo:'-'}</li>
                    <li>{order.consumer?order.consumer:'-'}</li>
                    </ul>
                </div>
                <div className="lens-info">
                    <div className="lens-prob">
                    <div className="properties-box">
                        <div className="l-box">{order.coverCode}</div>
                        <div className="r-box">پوشش</div>
                    </div>
                    <div className="properties-box">
                        <div className="l-box">{order.coridor}</div>
                        <div className="r-box">کریدور</div>
                    </div>
                    <div className="properties-box">
                        <div className="l-box">{order.frameType}</div>
                        <div className="r-box">نوع فریم</div>
                    </div>
                    {order.expressPrice?
                    <div className="properties-box">
                        <div className="l-box">فوری</div>
                        <div className="r-box">ارسال</div>
                    </div>:<></>}
                    {order.checkPrice?
                    <div className="properties-box">
                        <div className="l-box">دارد</div>
                        <div className="r-box">بررسی مجدد</div>
                    </div>:<></>}
                    </div>
                </div>
                <div className="lens-img">
                    <div className="lens-title">
                        <p>{lens?(lens.brandName+" "+lens.lenzType):''}</p>
                        <span>{lens?(lens.lenzIndex+" "+
                        lens.material+" "+lens.lenzDesign):''}</span>
                    </div>
                    <img src={`/img/brands/${lens?lens.brandName:''}.svg`}
                     alt={lens&&lens.brandName}/></div>
                <div className="desc">توضیحات: {order.moreInformation?order.moreInformation:' '}</div>
                </section>
                <div className="section-title">
                <p>اطلاعات نسخه</p>
                <div className="line"></div>
                </div>
                <section className="doc-sec">
                <div className="doc-table">
                    <div className="table-wrapper-1">
                    <table className="lens-table">
                        <tr>
                        <th>SPH</th>
                        <th>CYL</th>
                        <th>Axis</th>
                        <th>ADD</th>
                        <th>DIA</th>
                        <th>PD</th>
                        <th>FT/SEG</th>
                        <th>DECX</th>
                        <th>Prism</th>
                        <th>P/Base</th>
                        </tr>
                        <tr>
                        <td>{odMain[0]}</td>
                        <td>{odMain[1]}</td>
                        <td>{odMain[2]}</td>
                        <td>{odMain[3]}</td>
                        <td>{odMain[4]}</td>
                        <td></td>
                        <td></td>
                        <td>{odMore[2]}</td>
                        <td>{odMore[0]}</td>
                        <td>{odMore[1]}</td>
                        </tr>
                    </table>
                    <p>R</p>
                    </div>
                    <div className="table-wrapper-1">
                    <table className="lens-table">
                        <tr>
                        <th>SPH</th>
                        <th>CYL</th>
                        <th>Axis</th>
                        <th>ADD</th>
                        <th>DIA</th>
                        <th>PD</th>
                        <th>FT/SEG</th>
                        <th>DECX</th>
                        <th>Prism</th>
                        <th>P/Base</th>
                        </tr>
                        <tr>
                        <td>{osMain[0]}</td>
                        <td>{osMain[1]}</td>
                        <td>{osMain[2]}</td>
                        <td>{osMain[3]}</td>
                        <td>{osMain[4]}</td>
                        <td></td>
                        <td></td>
                        <td>{osMore[2]}</td>
                        <td>{osMore[0]}</td>
                        <td>{osMore[1]}</td>
                        </tr>
                    </table>
                    <p>L</p>
                    </div>

                </div>
                </section>
                <div className="section-title">
                <p>مشخصات فریم</p>
                <div className="line"></div>
                </div>
                <section className="frame-sec">
                <table className="lens-table">
                    <tr>
                    <th>HBox</th>
                    <th>VBox</th>
                    <th>DBL</th>
                    <th>FH</th>
                    <th>IPD</th>
                    <th>BVD</th>
                    <th>Panto</th>
                    <th>FFA</th>
                    <th>ED</th>
                    <th>Base</th>
                    </tr>
                    <tr>
                    <td>{frameSize[0]}</td>
                    <td>{frameSize[1]}</td>
                    <td>{frameSize[2]}</td>
                    <td>{frameSize[3]}</td>
                    <td>{frameSize[4]}</td>
                    <td>{frameSize[5]}</td>
                    <td>{frameSize[6]}</td>
                    <td>{frameSize[7]}</td>
                    <td>{frameSize[8]}</td>
                    <td>{frameSize[9]}</td>
                    </tr>
                </table>
                </section>
                <div className="section-title">
                <p>خدمات</p>
                <div className="line" style={{marginRight:"45px"}}></div>
                </div>
                <section className="service-sec">
                <div className="service-box">
                    
                    <div className="properties-box">
                    <div className="r-box">خدمات رنگ</div>
                    <div className="l-box">{order.colorCode}</div>
                    </div>
                    {services&&services.map((service,i)=>(
                        <div className="properties-box" key={i}>
                            <div className="r-box">{service.title}</div>
                            <div className="l-box">دارد</div>
                        </div>
                    ))}
                    {props.cylinder&&props.cylinder.map((service,i)=>(
                        <div className="properties-box" key={i}>
                            <div className="r-box">
                                {service.title.replace('خدمات ','')}</div>
                            <div className="l-box">دارد</div>
                        </div>
                    ))}
                    
                </div>
                </section>
                
            </div>
            
            </body>
    )
}
export default PreviewRXTable