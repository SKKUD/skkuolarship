import React, {useState} from 'react';
import { Button, Container, Grid, Box, Typography, Modal,} from '@mui/material';
import { Link } from 'react-router-dom';
import CustomTextField from '../components/CustomMUI/CustomTextField';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo4.png';
import character from '../images/character.png';

const Login = ({setIsLogin}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [modalOpen, setModalOpen] = useState(false);

    const handleLogin = async () => {
        try {
            console.log('username:', username);
            console.log('password:', password);

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password, 
                }),
            });
    
            if (response.ok) {
                const text = await response.text();
                console.log('응답결과',text);

                if(text === "로그인 아이디 또는 비밀번호가 틀렸습니다.") {
                    console.log('로그인 실패함');
                } else{
                    localStorage.setItem('accessToken', text);
                    setIsLogin(true);
                    navigate('/home');
                }
            } else {
                console.log('로그인 실패');
                // alert('아이디 또는 비밀번호가 잘못되었습니다.');
                setModalOpen(true);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
        }
    };
    
    
    return (
        <Container maxWidth="sm" sx={{ mt: 10, p: 10, width: '45%' }}>
            <Box sx={{pb: 2}}>
                <img src={character} alt="Logo" style={{ width: '75px', height: 'auto' }} />
                <img src={logo} alt="Logo" style={{ width: '220px', height: 'auto', marginLeft: '15px' }} />
            </Box>
            <form>
            <CustomTextField
                type="text"
                placeholder="아이디"
                required
                sx={{ mb: 3, mt: 3}}
                onChange={(e) => setUsername(e.target.value)}
            />
            <CustomTextField
                type="password"
                placeholder="비밀번호"
                required
                sx={{ mb: 3}}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                    width: '100%',
                    backgroundColor: 'green',
                    '&:hover': {
                        backgroundColor: 'darkgreen',
                    },
                    p: 1,
                    fontSize: '16px',
                }}
            >
                로그인
            </Button>
            <Grid container spacing={2} sx={{ mt: 2, width: '100%', justifyContent: 'center' }}>
                <Grid item xs={3} >
                    <Button
                        variant="text"
                        fullWidth
                        component={Link} 
                        to="/signUp"
                        sx={{color: '#505050'}}
                    >
                        회원가입
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="text"
                        fullWidth
                        sx={{color: '#505050'}}
                    >
                        아이디/비밀번호 찾기
                    </Button>
                </Grid>
            </Grid>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 3px 6px rgba(0,0,0,0.3)' }}>
                    <Typography variant="h6" sx={{fontWeight: 800, p: 2}}>❌ <br/> 아이디 또는 비밀번호가 틀렸습니다.</Typography>
                </div>
            </Modal>
            </form>
        </Container>
    );
}

export default Login;