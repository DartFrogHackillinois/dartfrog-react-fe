import React, { useState } from 'react';
import './UploadSection.css';
import { useDropzone } from 'react-dropzone';
import db from '../../firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

function UploadSection() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                let fileContents = e.target.result
            });
            // Handle file uploads
            for (const file of acceptedFiles) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const text = e.target.result;
                    try {
                        await addDoc(collection(db, "csvUploads"), {
                            content: text, // Assuming you want to store the CSV content in a field named 'content'
                            name: file.name,
                            timestamp: new Date(), // Or use serverTimestamp() if you imported it
                        });
                    } catch (error) {
                        console.error("Error uploading CSV content to Firestore:", error);
                    }
                };
                reader.readAsText(file); // Read the file as plain text
            }
        },
    });

    return (
        <div className="upload-section">
            <div className="sidebar">Past Chats</div>
            <div className="upload-area" {...getRootProps()}>
                <input {...getInputProps()}/>
                <p>Drag files here, or click to search your computer.</p>
            </div>
        </div>
    );
}

export default UploadSection;
