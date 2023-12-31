import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from '@mui/material';
import Header from '../components/Header';
import AllNotices from '../components/Notices/AllNotices';
import CustomNotices from '../components/Notices/CustomNotices';
import FavNotices from '../components/Notices/FavNotices';
import { Navigate } from 'react-router-dom';

const Home = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [scrappedNoticeIds, setScrappedNoticeIds] = useState([]);

  const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
  };

  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
    
    if (accessToken) {
      fetch('/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
      })
      .catch(error => {
        console.error('유저 정보 가져오기 오류:', error);
      });
    }
  }, []);

  useEffect(() => {
      updateNotices();
  }, []);

  const updateNotices = () => {
      const accessToken = localStorage.getItem('accessToken');

      fetch('/scrap', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      })
      .then(response => response.json())
      .then(data => {
          setScrappedNoticeIds(data.map(notice => notice.id));
      })
      .catch(error => {
          console.error('관심 장학 가져오기:', error);
      });
  };
  

  if (!isLogin) {
      return <Navigate to="/login" />;
  } 
  
  return (
    <div>
      <Header isLogin={isLogin}/>
      <div style={{ width: '100vw',  backgroundColor: 'green', overflowX: 'hidden' }}>
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
      <div style={{ padding: '30px 120px 50px', backgroundColor: '#F9F9F9' }}>
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

export default Home;
