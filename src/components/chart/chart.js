import React, { useRef, useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import functions from '../../functions'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    BarController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    BarElement,
    BarController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)

export default function ChartRender({ data, width, height, isChartAnimated, setIsOpenTooltip }) {
    const chartRef = useRef(null)
    const [minYValue, maxYValue] = functions.getMinMaxForChart(data)
    const padding = '0 5px'
    const xData = []
    const yProfitData = []
    const yBalanceData = []
    const yInvestSumData = []
    const startAmountOfPointsOnChart = 1
    const [index, setIndex] = useState(null)

    const chartData = useMemo(() => {
        for (let i = 0; i < data.length; i++) {
            xData.push(dayjs(data[i].time).format(`DD MMM YY`))
            yProfitData.push(functions.rounded(data[i].diff))
            yBalanceData.push(functions.rounded(data[i].balance))
            yInvestSumData.push(functions.rounded(data[i].investSum))
        }

        const initialDataLength = isChartAnimated ? startAmountOfPointsOnChart : data.length
        const xParseData = xData.slice(0, initialDataLength)
        const yParseProfitData = yProfitData.slice(0, initialDataLength)
        const yParseBalanceData = yBalanceData.slice(0, initialDataLength)
        const yParseInvestSumData = yInvestSumData.slice(0, initialDataLength)

        return {
            labels: xParseData,
            datasets: [
                {
                    label: 'Investment,$',
                    type: 'line',
                    data: yParseInvestSumData,
                    pointStyle: true,
                    borderWidth: 2,
                    borderColor: '#ef5350',
                    backgroundColor: '#fff',
                    tension: 0.0,
                    hoverBackgroundColor: '#fff',
                    hoverBorderWidth: 2,
                },
                {
                    label: 'Balance,$',
                    type: 'line',
                    data: yParseBalanceData,
                    pointStyle: true,
                    borderWidth: 2,
                    borderColor: '#42a5f5',
                    backgroundColor: '#fff',
                    tension: 0.35,
                    hoverBackgroundColor: '#fff',
                    hoverBorderWidth: 2,
                },
                {
                    label: 'Profit,$',
                    type: 'bar',
                    data: yParseProfitData,
                    pointStyle: false,
                    borderWidth: 2,
                    borderColor: yParseProfitData.map(functions.getBarColor),
                    backgroundColor: yParseProfitData.map(functions.getBarColor),
                    borderRadius: 2.5,
                },
            ],
        }
    }, [data])

    const yScaleConfig = {
        animation: true,
        min: minYValue,
        // max: maxYValue,
        grid: {
            display: false,
        },
        beginAtZero: true,
        title: {
            display: false,
        },
        grace: '5%',
        ticks: {
            color: '#000',
            callback: function (value, index, values) {
                return functions.shortenNumber(value)
            },
            textAlign: "left",
            align: "start",
            font: {
                size: 12,
                weight: 400
            },
            padding: 4
        },
    }

    const xScaleConfig = {
        ticks: {
            autoSkip: true,
            maxRotation: 50,
            minRotation: 50,
            color: '#000',
        },
        grid: {
            display: false,
        },
        beginAtZero: true,
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: xScaleConfig,
            y: yScaleConfig,
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    boxWidth: 15,
                    fontSize: '0.625em',
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.5)',
                mode: 'index',
                intersect: false,
            },
            customCanvasBackgroundColor: {
                color: '#f5f5f7',
            },
            chartAreaBorder: {
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [5, 5],
                borderDashOffset: 2,
            }
        },
        animation: {
            duration: 400,
            easing: 'linear',
        },
    }

    function openTooltipWithTimeout(delay, setter) {
        const timeoutId = setTimeout(() => {
            setter(true)
        }, delay)

        return timeoutId
    }

    useEffect(() => {
        let timeoutId
        if (!isChartAnimated) {
            timeoutId = openTooltipWithTimeout(550, setIsOpenTooltip)
        }
        if (index >= data.length - 1) {
            timeoutId = openTooltipWithTimeout(450, setIsOpenTooltip)
        }

        return () => {
            clearTimeout(timeoutId)
        }
    }, [index, data.length, isChartAnimated])

    useEffect(() => {
        setIsOpenTooltip(false)
    }, [width])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeout(() => {
                if (chartRef.current) {
                    const { data } = chartRef.current
                    const i = data.labels.length
                    if (i < xData.length) {
                        setIndex(i)
                        data.labels.push(xData[i])
                        data.datasets[0].data.push(yInvestSumData[i])
                        data.datasets[1].data.push(yBalanceData[i])
                        data.datasets[2].data.push(yProfitData[i])
                        data.datasets[2].backgroundColor = data.datasets[2].data.map(functions.getBarColor)
                        data.datasets[2].borderColor = data.datasets[2].data.map(functions.getBarColor)

                        chartRef.current.update()
                    } else {
                        clearInterval(interval)
                    }
                }
            }, 0)
        }, 300)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <div style={{
                width: width,
                height: height,
                padding: padding
            }}>
                <Line ref={chartRef} data={chartData} options={options} />
            </div>
        </div>
    )
}
