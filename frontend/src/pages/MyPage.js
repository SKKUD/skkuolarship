import React, { useState } from 'react';
import { Container, Tab, Tabs } from '@mui/material';
import Header from '../components/Header';
import AllNotices from '../components/Notices/AllNotices';
import CustomNotices from '../components/Notices/CustomNotices';
import FavNotices from '../components/Notices/FavNotices';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Header />
      <div style={{ width: '100vw',  backgroundColor: 'green' }}>
        <Container sx={{m: '0 86px'}}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="green" 
            textColor="inherit" 
          >
            <Tab label="모든 장학" sx={tabStyle(activeTab === 0)} />
            <Tab label="추천 장학" sx={tabStyle(activeTab === 1)} />
            <Tab label="관심 장학" sx={tabStyle(activeTab === 2)} />
          </Tabs>
        </Container>
      </div>
      <div style={{ padding: '30px 120px 50px' }}>
        {activeTab === 0 && <AllNotices />}
        {activeTab === 1 && <CustomNotices />}
        {activeTab === 2 && <FavNotices />}
      </div>
    </div>
  );
};

const tabStyle = (isActive) => ({
  color: isActive ? 'white' : 'lightgray',
  fontWeight: isActive ? 700 : 500,
  fontSize: '16px',
  padding: '18px 10px',
});

export default MyPage;
