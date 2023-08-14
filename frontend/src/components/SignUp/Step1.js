
import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import CustomTextField from '../CustomMUI/CustomTextField';
// import Popup from '../Popup';

const Step1 = ({ onNext }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  
    // const [isAlertOpen, setIsAlertOpen] = useState(false);
    // const [alertMessage, setAlertMessage] = useState('');

    const isDisabled =  !isUsernameAvailable || password === '' || password !== passwordConfirm ;

    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handlePasswordConfirmChange = (e) => {
      setPasswordConfirm(e.target.value);
    };
  
    const handleCheckUsername = () => {
      if (username === 'example') {
        setIsUsernameAvailable(false);
        alert('이미 사용 중인 아이디입니다.');
        // setIsAlertOpen(true);
        // setAlertMessage('이미 사용 중인 아이디입니다.');
      } else {
        setIsUsernameAvailable(true);
        alert('사용 가능한 아이디입니다!');
        // setIsAlertOpen(true);
        // setAlertMessage('사용 가능한 아이디입니다!');
      }
    };
        
    return (
      <>
        <form style={{ position: 'relative' }}>
            <CustomTextField
                type="text"
                placeholder="아이디"
                required
                sx={{  mb: 3, mt: 3}}
                value={username}
                onChange={handleUsernameChange}
            />            
            <Button
                variant="text"
                onClick={handleCheckUsername}
                sx={{color: '#505050', fontWeight: 700, position: 'absolute', top: 30,  right: 15, zIndex: 1}}
            >
            중복확인
            </Button>
            <CustomTextField
                type="password"
                placeholder="비밀번호"
                required
                sx={{ mb: 3 }}
                value={password}
                onChange={handlePasswordChange}
            />
            <CustomTextField
                type="password"
                placeholder="비밀번호 확인"
                required
                sx={{ mb: 3 }}
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
            />
            
            <Box mt={2}>
                <Button
                variant="standard"
                fullWidth
                disabled={isDisabled}
                // onClick={handleSignUp}
                onClick={onNext}
                sx={{
                  backgroundColor: isDisabled ? 'transparent' : 'green', 
                  '&:hover': {
                    backgroundColor: isDisabled ? 'transparent' : 'darkgreen', 
                  },
                  color: isDisabled ? '#505050' : 'white', 
                  p: 1,
                  fontSize: '16px',
                }}
                >
                다음
                </Button>
            </Box>
        </form>
      </>
    );
};

export default Step1;
