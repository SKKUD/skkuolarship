import { useState, useEffect } from 'react';
import { Typography, Paper, Button, InputBase, IconButton, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import SearchResultList from './SearchResultList';
import noResult from '../../images/noResult.png';
import Hangul from 'hangul-js';
import NoticeDetail from './NoticeDetail';
import NoticeFilter from './NoticeFilter';
import formatDate from '../../utils/formatDate';

const AllNotices = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const [sortType, setSortType] = useState('applyEarly');

    const tags = ['교내', '교외', '1학년', '2학년', '3학년', '4학년', '교환학생', '재학생', '휴학생', '취업지원', '주거지원'];

    const [notices, setNotices] = useState([]); 

    useEffect(() => {
        fetch('/all') 
            .then(response => response.json())
            .then(data => setNotices(data))
            .catch(error => console.error('데이터 불러오기 오류:', error));
    }, []); 

    const handleNoticeClick = (notice) => {
        if(selectedNotice !== null) {
            setSelectedNotice(null);
        } else {
            setSelectedNotice(notice);
        }
    };

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
          setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        } else {
          setSelectedTags([...selectedTags, tag]);
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
        const chosungdepartment = searchChosung(data.department);
        const chosungTitle = searchChosung(data.title);
      
        return (
            data.applyEndAt !== null &&
          (chosungdepartment.includes(searchChosung(searchTerm)) || chosungTitle.includes(searchChosung(searchTerm)) || (data.keywords && data.keywords.some((keyword) => searchChosung(keyword).includes(searchChosung(searchTerm))))) &&
          (selectedTags.length === 0 || data.keywords?.some((keyword) => selectedTags.includes(keyword)))
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
        <Typography variant="h5" sx={{ fontWeight: 900, margin: '20px 0px' }}>모든 장학</Typography>
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
            <div style={{borderTop: '2px solid lightgray', borderBottom: '2px solid lightgray', padding: '15px', margin: '35px 0 10px'}}>
                {tags.map((tag, index) => (
                    <Button
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        sx={{
                            backgroundColor: selectedTags.includes(tag) ? '#7DB249' : '#EDF0C7',
                            borderRadius: '20px',
                            m: '5px',
                            p: '5px 12px',
                            color: selectedTags.includes(tag) ? 'white' : '#505050',
                            '&:hover': {
                                backgroundColor: selectedTags.includes(tag) ? '#9DC08B' : '#EDF1D6', 
                                color: selectedTags.includes(tag) ? 'white' : '#505050', 
                            },
                            fontSize: '13px',
                        }}
                    >
                        {'#'+tag}
                    </Button>
                ))}
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



export default AllNotices;
