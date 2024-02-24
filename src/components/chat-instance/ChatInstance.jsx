import React from 'react'
import './ChatInstance.css'

function ChatInstance(Title, Description) {
    return (
        <div className='chat-instance-container'>
            <h2>{Title}</h2>
            {/* <p>{Description}</p> */}
        </div>
    );
}

export default ChatInstance;