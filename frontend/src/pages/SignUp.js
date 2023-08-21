import React from 'react';
import { Container, Typography} from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import Step1 from '../components/SignUp/Step1';
import Step2 from '../components/SignUp/Step2';
import Step3 from '../components/SignUp/Step3';


const stepTitles = ['회원가입', '기본정보 입력', '추가정보 입력'];

const SignUp = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = 3;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSignup = () => {
        alert('회원가입 완료!');
    };


    return (
        <>
            <Container maxWidth="sm" sx={{ p: 10, width: '45%' }}>
                <Typography variant="h4" align="center">
                    LOGO
                </Typography>
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
                              backgroundColor: 'green',
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
                {activeStep === 0 && <Step1 onNext={handleNext} />}
                {activeStep === 1 && <Step2 onNext={handleNext} />}
                {activeStep === 2 && <Step3 onNext={handleSignup} />}
            </Container>
        </>
    );
};

export default SignUp;