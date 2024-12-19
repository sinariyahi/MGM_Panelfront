
import { Bar ,Line} from 'react-chartjs-2';
import errortrans from '../../../translate/error';
import env from '../../../env';
import { useEffect, useState } from 'react';
function UserChart(props){
  const [data,setData] = useState('')
    useEffect(() => {
      const body={}
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          //"x-access-token":token&&token.token,"userId":token&&token.userId
        },
          body:JSON.stringify(body)
        }
    fetch(env.siteApi + "/report/userOrders",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setData('')
        setTimeout(()=> setData(result),200)
      },
      (error) => {
        console.log(error);
      }
      
  )},[])
    const labels = data?data.users:["","","","","","",""]
    const dataRaw = data?data.userOrder:["","","","","","",""]
    const dataTotal = data?data.userPrice:["","","","","","",""]
    
    const chartData = {
        labels,
        color:'rgb(255, 255, 2555)',
        datasets: [
          {
            label: "تعداد سفارش" ,
            data: dataRaw,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            backgroundColor: ["aqua"],
            color:['rgb(255, 255, 255)'],
          },
          {
            label: 'میلیون',
            data: dataTotal,
            barPercentage: 0.5,
            rtl: true,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            backgroundColor: [
              'rgba(255, 255, 255, 0.8)'
            ],
            color:['rgb(255, 255, 255)'],
          }
        ],
      };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      tooltips: {
        rtl: true 
      }
    };
    
    return(<>
        <Bar data={chartData} options={options}/>
        </>
    )
}
export default UserChart