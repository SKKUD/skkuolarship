import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import { useNavigate } from 'react-router-dom';
import characterImage from '../images/character1.png';

const SplashScreen = () => {
    const navigate = useNavigate();
    const [showText, setShowText] = useState(false);
    const [showSecondText, setShowSecondText] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const handleFirstTextClick = () => {
        setShowText(false);
        setShowSecondText(true);
    };

    const handleSecondTextClick = () => {
        setShowSecondText(false);
        setShowImage(true);
    };

    const handleImageClick = () => {
        navigate('/login');
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
        setShowText(true);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);


    return (
        <div className="splash-screen">
        {showText && (
            <h1 className="splash-text" onClick={handleFirstTextClick}>
            쓱
            </h1>
        )}
        {showSecondText && (
            <h1 className="second-splash-text" onClick={handleSecondTextClick}>
            골라
            </h1>
        )}
        {showImage && (
            <div onClick={handleImageClick}>
                <img src={characterImage} alt="Character" className="character-image" />
            </div>
        )}
        </div>
    );
};

export default SplashScreen;