import React from 'react'
import './ChatInstance.css'

function ChatInstance(title, description) {
    return (
        <div className='chat-instance-container'>
            <h2>{title}</h2>
             <p>{description}</p>
        </div>
    );
}

export default ChatInstance;