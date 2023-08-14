import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Sidebar from './Sidebar';

const Header = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

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
                    <Button color="inherit" onClick={handleSidebarOpen} sx={{fontWeight: 900}} >
                        마이페이지
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/login" sx={{fontWeight: 900}}>
                        로그인
                    </Button>
                )}
            </div>
            </Toolbar>
        </AppBar>
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} isLogin={isLogin} />
        </>
    );
};

export default Header;