import {Line,Doughnut} from "react-chartjs-2"
import {Chart as ChartJS,Tooltip,Filler,CategoryScale,LinearScale,PointElement,LineElement,ArcElement,Legend} from "chart.js"
import { lightPink, lightPurple, pink, purple } from "../../constants/colors"
import { getLast7days } from "../../lib/features"

ChartJS.register(Tooltip,Filler,CategoryScale,Legend,LinearScale,PointElement,LineElement,ArcElement)


const LineChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false
        },
        title:{
            display:false
        }
    },
    scales:{
        x:{
            grid:{
                display:false
            },
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false
            }
        }
    }
}

export const LineChart=({value=[]})=>{
    const data={
        labels:getLast7days(),
        datasets:[
            {
                label:'Messages',
                data:value,
                fill:true,
                backgroundColor:lightPurple,
                borderColor:purple,
            }
        ]
    }
    return(
        <Line data={data} options={LineChartOptions}/>
    )
}


const DoughnutChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false
        },
        title:{
            display:false
        }
    },
    cutout:120
}


export const DoughnutChart=({value=[],labels=[]})=>{
    const data={
        labels,
        datasets:[
            {
                data:value,
                backgroundColor:[lightPurple,lightPink],
                hoverBackgroundColor:[purple,pink],
                borderColor:[purple,pink],
                offset:30
            }
        ]
    }

    return(
        <Doughnut data={data} options={DoughnutChartOptions} style={{zIndex:10}}/>
    )
}
