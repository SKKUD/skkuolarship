import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import Step1 from '../components/SignUp/Step1';
import Step2 from '../components/SignUp/Step2';
import Step3 from '../components/SignUp/Step3';
import logo from '../images/logo5.png';
import character from '../images/character.png';
import { useNavigate } from 'react-router-dom';

const stepTitles = ['회원가입', '기본정보 입력', '추가정보 입력'];

const SignUp = () => {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = 3;
    const [step1Data, setStep1Data] = useState({});
    const [step2Data, setStep2Data] = useState({});

    const handleStep1Complete = (data) => {
        setStep1Data(data);
        setActiveStep(1);
    };
    
    const handleStep2Complete = (data) => {
        setStep2Data(data);
        setActiveStep(2);
    };

    const handleSignUp = async (mergedData) => {
        const response = await fetch('/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: mergedData.username,
                password: mergedData.password,
                email: mergedData.email,
                sex: mergedData.sex,
                birth: mergedData.birth,
                major: mergedData.major,
                semester: mergedData.semester,
                enrollStatus: mergedData.enrollStatus,
                gpa: mergedData.gpa,
                lastSemGpa: mergedData.lastSemGpa,
                incomeBracket: mergedData.incomeBracket,
                residence: mergedData.residence,
            }),
        });

        console.log('response:', response);
        if(response.status === 200) {
            navigate('/login');
        } else {
            alert('회원가입 실패');
        }
    };
    
    const handleNext = (data) => {
        if (activeStep === 2) {
            const mergedData = {
                ...step1Data,
                ...step2Data,
                ...data,
            };
            console.log('mergedData:', mergedData);
            handleSignUp(mergedData);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ p: 8, width: '45%' }}>
                <Box sx={{pb: 2}}>
                    <img src={character} alt="Logo" style={{ width: '75px', height: 'auto' }} />
                    <img src={logo} alt="Logo" style={{ width: '220px', height: 'auto', marginLeft: '15px' }} />
                </Box>
                <div style={{ marginTop: 10 }}>
                    <MobileStepper
                        variant="dots"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        sx={{
                            pl: 0,
                            '& .MuiMobileStepper-dot': {
                                margin: '0 3px',
                                transition: 'background-color 0.3s ease-in-out',
                            },
                            '& .MuiMobileStepper-dotActive': {
                              backgroundColor: '#FFD302',
                            },
                        }}
                    />
                    <Typography
                        variant="h5"
                        align="left"
                        sx={{ mt: '15px', mb: 3, fontWeight: '700' }}
                    >
                        {stepTitles[activeStep]} 
                    </Typography>
                </div>
                {activeStep === 0 && <Step1 onNext={handleStep1Complete} />}
                {activeStep === 1 && <Step2 onNext={handleStep2Complete} />}
                {activeStep === 2 && <Step3 onNext={handleNext} />}
            </Container>
        </>
    );
};

export default SignUp;