import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadarElement, BubbleElement, PieElement, PolarAreaElement, ScatterElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Register the chart types and components you will use
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartInstance = ({ chartData, chartType }) => {

console.log(chartData);
console.log(chartType);
  return (
      <div>
        <h2>{chartType} Chart</h2>
        <Chart type={chartType} data={chartData.data} options={chartData.options} />
      </div>
  );
};

export default ChartInstance;
