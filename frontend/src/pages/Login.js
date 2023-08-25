import React, {useState} from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomTextField from '../components/CustomMUI/CustomTextField';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            console.log('로그인 시도');
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
                    alert(text);
                    // navigate('/');

                }
                else{
                    navigate('/');
                }
                // const data = await response.json(); 
                // console.log('로그인 응답 데이터:', data)
                // if (data.token) {
                //     console.log('로그인 성공');
                //     console.log('토큰:', data.token);
                // } else {
                //     console.log('로그인 성공 (토큰 없음)');
                // }
            } else {
                console.log('로그인 실패');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
        }
    };
    
    
    return (
        <Container maxWidth="sm" sx={{ mt: 10, p: 10, width: '45%' }}>
            <Typography variant="h4" align="center" >
            LOGO
            </Typography>
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
            </form>
        </Container>
    );
}

export default Login;