import React, { useState, useEffect } from 'react';
import { query, getDocs, collection, where, getFirestore } from 'firebase/firestore';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import './ResponseChart.css';
import {Bar, Line, Radar, Doughnut, Pie, PolarArea, Bubble, Scatter} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    RadialLinearScale
} from 'chart.js';
var message = "Loading chart..."
const db = getFirestore(app);

// Register the chart components you're using
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement, // Make sure to register the PointElement
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
);

// Mapping from chart type string to the corresponding React component
const chartComponents = {
    line: Line,
    bar: Bar,
    radar: Radar,
    doughnut: Doughnut,
    pie: Pie,
    polarArea: PolarArea,
    bubble: Bubble,
    scatter: Scatter,
};

function ResponseChart() {
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState('');

    useEffect(() => {
        const getUserResponses = async () => {
            const responseMessagesQuery = query(
                collection(db, "graphData"),
                where("user_id", "==", localStorage.getItem("user_id")),
                where("file_id", "==", localStorage.getItem("component_id"))
            );
            const querySnapshot = await getDocs(responseMessagesQuery);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                console.log(doc.data());
                if (doc.exists()) {
                    const data = doc.data();
                    console.log(data.graph_response);
                    setChartType(data.graph_type); // Ensure lowercase to match keys in chartComponents
                    setChartData(data.graph_response); // Assuming this is the correct format for react-chartjs-2
                }else {
                    console.log("Document does not exist");
                }
            }
            else {
                console.log("Query snapshot is empty");
            }
        };

        getUserResponses();
    }); // Dependency array is empty, so this effect runs once on mount
    function getRandomMutedColor() {
        const hue = Math.floor(0.44 * 360); // Random hue from 0 to 359
        const saturation = Math.floor(0.3 * 30) + 40; // Saturation between 40% to 70% for muted effect
        const lightness = Math.floor(0.3 * 20) + 40; // Lightness between 40% to 60% to avoid too bright or too dark colors
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    function makeDarkerHSL(hslColor, darkenAmount = 20) {
        // Assuming the input format is "hsl(120, 50%, 50%)"
        // Extract the HSL values
        const [hue, saturation, lightness] = hslColor.match(/\d+/g).map(Number);

        // Calculate the new lightness, ensuring it doesn't go below 0
        let newLightness = lightness - darkenAmount;
        if (newLightness < 0) newLightness = 0;

        // Return the new HSL color
        return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
    }
    const color1 = getRandomMutedColor();
    const color2 = makeDarkerHSL(color1);
    const SpecificChart = chartComponents[chartType];
    console.log(chartData);
    const chartOptions = {
        backgroundColor: color1,
        borderColor: color2,
        maintainAspectRatio: true, // Set to false for a responsive height
        aspectRatio: 0.15, // Adjust this value as needed to control the chart's height; higher values make the chart shorter
        animation: {
            duration: 600, // Smooth transition for animations
            easing: 'easeInOutQuad', // Modern easing function for animations
        },
        scales: {
            y: {
                beginAtZero: false, // Logarithmic scale does not support beginning at zero
                grid: {
                    color: "rgba(58,58,58,0.1)", // Softer grid lines for a less bright look
                    borderColor: "rgba(68,68,68,0.3)", // Softer border for a fresh look
                },
                ticks: {
                    color: "#414141", // Even lighter grey tick labels for softer contrast
                    callback: function(value, index, values) { // Custom callback to format ticks
                        return Number(value.toString()); // Return the value as is
                    }
                },
                afterBuildTicks: (chart) => { // Optional: Custom tick generation for logarithmic scale
                    chart.ticks = chart.ticks.filter((tick) => Number.isInteger(tick));
                },
            },
            x: {
                grid: {
                    display: false, // Cleaner look by removing grid lines on the x-axis
                },
                ticks: {
                    color: "#5b5b5b", // Light grey tick labels for softer contrast
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: "#737373", // Light grey text for the legend for better readability
                    padding: 20, // Add some padding for a spacious look
                    font: {
                        size: 14, // Increase font size for better visibility
                    },
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                bodyFont: {
                    size: 14,
                },
                titleFont: {
                    size: 16,
                },
                backgroundColor: 'rgba(80, 80, 80, 0.9)', // Darker tooltips for softer contrast
                titleColor: '#aaaaaa',
                bodyColor: '#aaaaaa',
                borderColor: 'rgba(180, 180, 180, 0.3)',
                borderWidth: 1,
                cornerRadius: 4, // Rounded corners for tooltips
                displayColors: true,
            },
        },
        elements: {
            line: {
                tension: 0.4, // Adds a slight curve to line charts for a modern look
            },
            point: {
                radius: 5, // Increase the size of the point for better visibility
                hoverRadius: 8, // Larger hover radius
                backgroundColor: 'rgb(45,87,87)', // Use a more blue-green color for points
            },
            bar: {
                borderRadius: 20, // Rounded bars for a modern look
                borderSkipped: 'bottom', // Skip border at the bottom for a cleaner look
            },
        },
    };



    return (
        <div onClick={() => console.log("Clicked")} className='response-text-container'>
            {SpecificChart && chartData ? (
                <SpecificChart data={chartData.data} options={chartOptions} />
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
}

export default ResponseChart;
