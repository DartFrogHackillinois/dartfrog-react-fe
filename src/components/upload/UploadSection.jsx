import React from 'react';
import './UploadSection.css';

function UploadSection() {
    return (
        <div className="upload-section">
            <div className="sidebar">Past Chats</div>
            <div className="upload-area">
                <input type="file" accept=".csv" />
                {/* Implement drag and drop functionality here */}
            </div>
        </div>
    );
}

export default UploadSection;
