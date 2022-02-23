import React, { useRef, useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Chart = ({
    type,
    title,
    data,
    bgColor = 'rgba(40, 200, 64, 0.2)',
    showLabel = true,
    lineColor = 'rgba(40, 200, 64, 1)',
    ...props
}) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [xAxis, setXAxis] = useState(null);
    const [yAxis, setYAxis] = useState(null);

    useEffect(() => {
        const generateXAxisLabels = () => {
            let labelsArray = [];

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                labelsArray.push(element.x);
            }

            if (labelsArray.length === data.length) {
                setXAxis(labelsArray);
            }
        };
        const generateYAxisLabels = () => {
            let labelsArray = [];

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                labelsArray.push(element.x);
            }

            if (labelsArray.length === data.length) {
                setYAxis(labelsArray);
            }
        };

        if (data && (xAxis == null || yAxis == null)) {
            generateXAxisLabels();
            generateYAxisLabels();
        }
    }, [data]);

    useEffect(() => {
        console.log('xAxis', xAxis);
    }, [xAxis]);
    useEffect(() => {
        console.log('yAxis', yAxis);
    }, [yAxis]);

    const options = {
        title: {
            display: false,
            text: '',
            fontSize: 10,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
            line: {
                tension: 0.2,
            },
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    display: false,
                },
                grid: {
                    lineWidth: 0,
                },
            },
            y: {
                display: false,
                position: 'right',
                ticks: {
                    display: false,
                },
                grid: {
                    lineWidth: 0,
                },
            },
        },
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data1 = {
        labels: yAxis,
        datasets: [
            {
                label: 'Dataset 1',
                data: data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const getDateAndTime = (timestamp) => {
        let date = new Date(timestamp);
        return `${
            timestamp
                ? `${getTimeStamp(timestamp)}, ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                : ''
        }`;
    };

    const getTimeStamp = (timestamp) => {
        let date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    const getFormattedValue = (number) => {
        if (!number || isNaN(number)) return 0;

        let value = number.toString();
        if (value < 1) {
            if (value.includes('e-')) {
                return '< 0.001';
            } else {
                let temp = number.toFixed(3);
                if (temp === '0.000') {
                    return '< 0.001';
                } else {
                    return temp;
                }
            }
        } else {
            if (value.includes('.') && value.split('.')[1].length > 3) {
                return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        }
    };

    return <Line options={options} data={data1} />;
};

export default Chart;
