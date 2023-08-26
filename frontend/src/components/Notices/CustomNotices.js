import { useState, useEffect } from 'react';
import { Typography, Paper, InputBase, IconButton, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchResultList from './SearchResultList';
import noResult from '../../images/noResult.png';
import Hangul from 'hangul-js';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import formatDate from '../../utils/formatDate';
import NoticeDetail from './NoticeDetail';
import NoticeFilter from './NoticeFilter';

const CustomNotices = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('applyEarly');
    const [notices, setNotices] = useState([]); 
    const [selectedNotice, setSelectedNotice] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
          fetch('/recommendation', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            setNotices(data);
          })
          .catch(error => {
            console.error('추천 장학 가져오기:', error);
          });
        }
    }, []);

    const handleNoticeClick = (notice) => {
        if(selectedNotice !== null) {
            setSelectedNotice(null);
        } else {
            setSelectedNotice(notice);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    const searchChosung = (text) => {
        return Hangul.disassemble(text).filter((char) => Hangul.isCho(char)).join('');
    };
    
    const filteredData = notices && notices.filter((data) => {
        return (
            data.applyEndAt !== null &&
          (searchChosung(data.department).includes(searchChosung(searchTerm)) ||
          searchChosung(data.title).includes(searchChosung(searchTerm)) ||
          (data.keywords && data.keywords.some((keyword) => searchChosung(keyword).includes(searchChosung(searchTerm)))))
        );
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortType === 'applyLate') {
          return new Date(b.applyEndAt) - new Date(a.applyEndAt);
        } else if (sortType === 'applyEarly') {
          return new Date(a.applyEndAt) - new Date(b.applyEndAt);
        } 

        return 0;
    });


    const today = new Date();
    
    const updatedData = sortedData.map((data) => {
        const endDate = new Date(data.applyEndAt);
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

        let status;
        if (daysLeft < 0) {
            status = "모집 완료";
        } else if (daysLeft < 1) {
            status = "오늘 마감";
        } else {
            status = `D-${daysLeft}`;
        }

        return {
            ...data,
            daysLeft,
            status,
            applyEndAt: formatDate(data.applyEndAt),
        };
    });

    return (
        <>
        <Typography variant="h5" sx={{ fontWeight: 900, margin: '20px 0px' }}>추천 장학</Typography>
        { selectedNotice !== null ? (
            <div onClick={handleNoticeClick} style={{display: 'flex', alignItems: 'center', padding: '5px 0 10px'}}>
                <ArrowBackIcon sx={{ fontSize: 22, cursor: 'pointer', color: 'gray'}} />
                <Typography variant="body1" sx={{ fontWeight: 700, cursor: 'pointer', pt: '2px', color: 'gray'}}>목록보기</Typography>
          </div>
        ) : (
            <>
                <div style={{ display:'flex', justifyContent:'flex-end'}}>
                <Paper
                    component="form"
                    sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', width: 400 , backgroundColor: '#f5f5f5'}}
                    elevation={0}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="검색"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            <NoticeFilter sortType={sortType} handleSortChange={handleSortChange} filteredDataLength={filteredData.length} />
            </>
        )}
        { selectedNotice !== null ? (
            <NoticeDetail notice={selectedNotice} />
            ) : (
            updatedData.length === 0 ? (
                <Container sx={{textAlign: 'center'}}>
                    <img src={noResult} alt="noResult" width={256} />
                    <Typography variant="body1" sx={{ fontWeight: 700, margin: '24px 0px'}}>검색 결과가 없습니다. <br/> 다른 검색어를 입력해주세요!</Typography> 
                </Container>
            ) : (
                <SearchResultList data={updatedData} onNoticeClick={handleNoticeClick} />
            )
        )}
        </>
    );
};

export default CustomNotices;
