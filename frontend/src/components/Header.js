import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Sidebar from './Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import logo1 from '../images/logo1.png';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';
import logo4 from '../images/logo4.png';
import character from '../images/character.png';

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
        <AppBar position="static" elevation={0} >
            <Toolbar style={{ padding: '15px 100px', justifyContent: 'space-between', backgroundColor: '#fff', color: '#000', textAlign: 'center', alignItems: 'center' }}>
            <div style={{width: '50px'}}></div>
            <div style={{alignItems: 'center', display: 'flex'}}>
                <img src={character} alt="Logo" style={{ width: '70px', height: 'auto' }} />
                <img src={logo4} alt="Logo" style={{ width: '200px', height: 'auto', marginLeft: '15px' }} />
            </div>
            <div className="right-section" style={{ display: 'flex', alignItems: 'center' }}>
                {isLogin ? (
                    <Button color="inherit" onClick={handleSidebarOpen} >
                        <MenuIcon sx={{ width: '28px'}} />
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/login" sx={{fontWeight: 900, fontSize: '15px'}}>
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