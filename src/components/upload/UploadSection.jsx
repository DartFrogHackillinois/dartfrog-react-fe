import React from 'react';
import './UploadSection.css';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function UploadSection() {

    /*
    Upload section uses the react-dropzone library.
    */

    const [uploadedFiles, setUploadedFiles] = useState([]);

    // Controls what the uploaded files are, this is where we can access them
    const { getRootProps, getInputProps } = useDropzone( {
        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
            // TODO: create an API endpoint to handle file uploads to the database
        },
    });


    return (
        <div className="upload-section">
            <div className="sidebar">Past Chats</div>
            <div className="upload-area" {...getRootProps()}>
                <input {...getInputProps()}/>
                <p>Drag files here! Or, click to search your computer.</p>
            </div>
        </div>
    );
}

export default UploadSection;
