import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const SplashScreen = () => {
    const navigate = useNavigate();
    const [showText, setShowText] = useState(false);
    const [showSecondText, setShowSecondText] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const handleFirstTextClick = () => {
        setShowText(false);
        setShowSecondText(true);
    };

    const handleSecondTextClick = () => {
        setShowSecondText(false);
        setShowButton(true);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
        setShowText(true);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    const handleStartClick = () => {
        console.log('시작하기 버튼 클릭');
        navigate('/login');
    };

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
        {showButton && (
            <Button variant="contained" onClick={handleStartClick}>
            시작하기
            </Button>
        )}
        </div>
    );
};

export default SplashScreen;

// import React, { useState, useEffect } from 'react';
// import './SplashScreen.css';

// const SplashScreen = () => {
//   const [showText, setShowText] = useState(false);
//   const [showSecondText, setShowSecondText] = useState(false);

//   const handleFirstTextClick = () => {
//     setShowText(false);
//     setShowSecondText(true);
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setShowText(true);
//     }, 1500);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="splash-screen">
//       {showText && (
//         <h1 className="splash-text" onClick={handleFirstTextClick}>
//           쓱
//         </h1>
//       )}
//       {showSecondText && <h1 className="second-splash-text">골라</h1>}
//     </div>
//   );
// };

// export default SplashScreen;
