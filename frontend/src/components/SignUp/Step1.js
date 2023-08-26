
import React, { useState } from 'react';
import { Button, Box, Modal, Typography } from '@mui/material';
import CustomTextField from '../CustomMUI/CustomTextField';

const Step1 = ({ onNext }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
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
      if ( username === '') {
        setIsUsernameAvailable(false);
        setModalOpen(true);
        setAlertMessage('다른 아이디를 입력해주세요.');
        setTimeout(() => {
          setModalOpen(false);
        }, 1000);
      } else {
        setIsUsernameAvailable(true);
        setAlertMessage('사용 가능한 아이디입니다.');
        setModalOpen(true);

        setTimeout(() => {
          setModalOpen(false);
        }, 1000);
      }
    };

    const handleNext = () => {
      const step1Data = {
          username,
          password,
      };
      onNext(step1Data);
      console.log('step1Data:', step1Data);
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
                onClick={handleNext}
                sx={{
                  backgroundColor: isDisabled ? 'transparent' : '#FFD302', 
                  '&:hover': {
                    backgroundColor: isDisabled ? 'transparent' : '#FFCD4A', 
                  },
                  color: isDisabled ? '#505050' : 'white', 
                  p: 1,
                  fontSize: '16px',
                }}
                >
                다음
                </Button>
            </Box>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} >
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 3px 6px rgba(0,0,0,0.3)' }}>
                <Typography variant="h6">{alertMessage}</Typography>
              </div>
            </Modal>
        </form>
      </>
    );
};

export default Step1;
