import { normalPriceCount } from "../../../env"

function UserStatisticTable(props){
    const data=props.userData
    return(
        <tr>
            <td>
            <div class="d-flex px-2 py-1">
                <div>
                <img src={data.imageUrl} class="avatar avatar-sm me-3" alt="xd"/>
                </div>
                <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">{data.ip}</h6>
                </div>
            </div>
            </td>
            <td>
            <div class="avatar-group mt-2">
                {data.category&&data.category.map((cat,i)=>(
                    <a class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip"
                        key={i} title="Ryan Tompson">
                    <img src={`/img/icons/os-${cat}.png`} alt="team1"/>
                    </a>
                ))}
            </div>
            </td>
            <td class="align-middle text-center text-sm">
            <span class="text-xs font-weight-bold">{normalPriceCount(data.request)}</span>
            </td>
            <td class="align-middle">
            <div class="progress-wrapper w-75 mx-auto">
                <div class="progress-info">
                <div class="progress-percentage">
                    <span class="text-xs font-weight-bold">{data.status}%</span>
                </div>
                </div>
                <div class="progress">
                <div class={`progress-bar w-${data.status}`} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            </td>
        </tr>
    )
}
export default UserStatisticTable