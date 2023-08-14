import React, { useState } from 'react';
import { Drawer, List, ListItem, Avatar, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircle from '@mui/icons-material/AccountCircle';
import profileF from '../images/profileFemale.jpeg';
import UserInfoDialog from './UserInfoDialog';

const Sidebar = ({ isOpen, onClose, isLogin }) => {
    const userId = "진아지롱";
    const [openDialog, setOpenDialog] = useState(false);
    const [userInfo, setUserInfo] = useState({
        gender: '여성',
        birthDate: '1999-01-01',
        major: '컴퓨터공학과',
        semester: '6',
        registrationStatus: '재학',
        income: '5',
        averageGrade: '3.5',
        lastSemesterGrade: '3.8',
        residenceInfo: { residence: '서울', city: '강남구' },
    });

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose} sx={{ width: '300px' }}>
            <Button onClick={onClose} sx={{mt: 3, p: '0', width: 'max-content'}}>
                <ChevronLeftIcon sx={{color: 'gray'}}/>
            </Button>
            <List sx={{ height: '100%', padding: '0 50px' }}>
                <ListItem sx={{height: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center', m: '50px 0 30px'}}>
                    {isLogin ? 
                    <>
                        <Avatar src={profileF} alt="프로필 사진" sx={{ width: '160px', height: '160px', mb: '20px'}} />
                        <Typography sx={{fontWeight: 800}}>{userId} 님</Typography>
                        <Button onClick={handleOpenDialog} sx={{backgroundColor: 'green', color: '#fff', m: 3, p: '5px 20px', '&:hover': {backgroundColor: 'yellowgreen'}, fontWeight: 600 }}>
                            내 정보 
                        </Button>
                    </>
                    : <AccountCircle sx={{ fontSize: 160, mb: '20px', color: 'gray' }} />}
                </ListItem>
            </List>
            <UserInfoDialog open={openDialog} onClose={handleCloseDialog} userInfo={userInfo} setUserInfo={setUserInfo} />
        </Drawer>
    );
};

export default Sidebar;
