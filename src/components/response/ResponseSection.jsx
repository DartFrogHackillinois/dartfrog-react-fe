import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Importing a Bar chart component
import './ResponseSection.css';


function ResponseSection() {
    const [responseType, setResponseType] = useState('text'); // 'text', 'graph', etc.

    // Dummy data for the graph
    const graphData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40],
            },
        ],
    };

    // Function to render the content based on the response type
    const renderContent = () => {
        switch (responseType) {
            case 'text':
                return <p>This is a textual response. Switch to other types for more.</p>;
            case 'graph':
                return <Bar data={graphData} />;
            default:
                return <p>Unsupported response type.</p>;
        }
    };

    return (
        <div className="response-section">
            <div className="response-controls">
                <button onClick={() => setResponseType('text')}>Text</button>
                <button onClick={() => setResponseType('graph')}>Graph</button>
                {/* Add more buttons or controls for different response types */}
            </div>
            <div className="response-content">{renderContent()}</div>
        </div>
    );
}

export default ResponseSection;
