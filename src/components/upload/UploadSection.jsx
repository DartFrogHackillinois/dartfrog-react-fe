import React, { Fragment, useState } from 'react';
import './UploadSection.css';
import { useDropzone } from 'react-dropzone';
import app from '../../firebaseconfig';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
const db = getFirestore(app);
import ChatInstance from '../chat-instance/ChatInstance';
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

    const chats = [{id: "Component1", component: ChatInstance("New Chat 1", "Description 1")}, {id: "Component2", component: ChatInstance("New Chat 2", "Description 2")}, 
    {id: "Component3", component: ChatInstance("New Chat 3", "Description 3")}, {id: "Component4", component: ChatInstance("New Chat 4", "Description 4")},
    {id: "Component5", component: ChatInstance("New Chat 5", "Description 5")}, {id: "Component6", component: ChatInstance("New Chat 6", "Description 6")},
    {id: "Component7", component: ChatInstance("New Chat 7", "Description 7")}, {id: "Component8", component: ChatInstance("New Chat 8", "Description 8")}]

    return (
        <div className="upload-section">

            <div className="sidebar">
            Past Chats
            {chats.map((chat) =>
                <Fragment key={chat.id}>
                    {chat.component}
                </Fragment>)}
            </div>
            <div className="upload-area" {...getRootProps()}>
                <input type="file" accept=".csv" {...getInputProps()}/>
                <p>Drag files here, or click to search your computer.</p>
            </div>
        </div>
    );
}

export default UploadSection;
