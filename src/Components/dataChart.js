import { Chart, ArcElement, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import React from 'react'

Chart.register(ArcElement)
const DataChart = (props) => {
    const dataSet = {
        labels: [
            '10 Minute',
            '15 Minute',
            '20 Minute',
            '25 Minute',
            '30 Minute'
        ],
        datasets: [{
            labels: 'Timers Completed:',
            data:[props.ten,props.fifteen,props.twenty,props.twentyFive,props.thirty],
            backgroundColor: [
                'rgb(62, 221, 255)',
                'rgb(62, 191, 255)',
                'rgb(62, 161, 255)',
                'rgb(62, 130, 255)',
                'rgb(62, 77, 255)'
            ]
        }
    ],
    }
    const dataOptions = {
            responsive:true,
            cutout:0,
            hoverOffset:4,
            legend:{
                display:true
            }
    }
    return (
        <Doughnut data ={dataSet} options = {dataOptions}/>
    )
}
export default DataChart