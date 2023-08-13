import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
        <AppBar position="static" elevation={0}>
            <Toolbar style={{ padding: '10px 120px', justifyContent: 'space-between', backgroundColor: '#fff', color: '#000', textAlign: 'center' }}>
            {/* <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto', marginLeft: '15px' }} /> */}
            <Typography variant="h6" style={{ fontWeight: 900 }}>Logo</Typography>

            <div className="right-section" style={{ display: 'flex', alignItems: 'center' }}>
                <Button color="inherit" component={Link} to="/calender" sx={{fontWeight: 900}}>
                    장학 캘린더
                </Button>
                {isLogin ? (
                <IconButton color="inherit" >
                    <PersonIcon component={Link} to="/myPage"/>
                    </IconButton>
                ) : (
                    <Button color="inherit" component={Link} to="/login" sx={{fontWeight: 900}}>
                        Login
                    </Button>
                )}
            </div>
            </Toolbar>
        </AppBar>
        </>
    );
};

export default Header;