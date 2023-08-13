import React from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomTextField from '../components/CustomTextField';

const Login = () => {
    const handleLogin = () => {
        // 로그인 처리 로직
        
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
            />
            <CustomTextField
                type="password"
                placeholder="비밀번호"
                required
                sx={{ mb: 3}}
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