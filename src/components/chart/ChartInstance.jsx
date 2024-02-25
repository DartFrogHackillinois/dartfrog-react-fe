import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import jsonData from './data.json'; // Import your JSON file

function MyChartComponent() {
  const chartRef = useRef(null); // Create a reference to the canvas element

  useEffect(() => {
    // Access the canvas element using the ref
    const ctx = chartRef.current.getContext('2d');

    // Extracting data from JSON
    const labels = jsonData.map(item => item.label); // Extracting labels from JSON
    const dataValues = jsonData.map(item => item.value); // Extracting data values from JSON

    // Creating a new Chart instance
    new Chart(ctx, {
      type: 'bar', // Specify the chart type (bar chart in this case)
      data: {
        labels: labels, // Set labels for x-axis
        datasets: [{
          label: 'Data Values', // Label for the dataset
          data: dataValues, // Data values for y-axis
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for bars
          borderColor: 'rgba(75, 192, 192, 1)', // Border color for bars
          borderWidth: 1 // Border width for bars
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Start y-axis at zero
          }
        }
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div>
      <h2>Chart</h2>
      {/* Canvas element where the chart will be drawn */}
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
}

export default MyChartComponent;
