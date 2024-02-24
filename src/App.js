import React, { useState } from 'react';
import './App.css';
import SignIn from './components/sign-in/SignIn.jsx';
import UploadSection from './components/upload/UploadSection';
import ResponseSection from './components/response/ResponseSection';

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [generating, setGenerating] = useState(false);
    const handleSignIn = () => setIsSignedIn(true);

    return (
        <>
            {!isSignedIn ? (
                <SignIn onSignIn={handleSignIn}/>
            ) : (
                <div className="app-wrapper">
                    <UploadSection setGenerating={setGenerating}/>
                    <ResponseSection generating = {generating} setGenerating={setGenerating}/>
                </div>
            )}
        </>
    );
}

export default App;
