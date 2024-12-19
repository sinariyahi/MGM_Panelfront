function InlineOrder(props){
    return(
        <div className="orderRow">
            سفارش: {props.order.value}
            <span className="checkStatus">
            {props.order.status?
                props.order.status=="success"?
                <i className="fa greenIcon fa-check"></i>:
                <i className="fa fa-remove"></i>:<></>}
            </span>
        </div>
    )
}
export default InlineOrder