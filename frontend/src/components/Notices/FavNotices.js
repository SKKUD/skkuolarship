import { useState } from 'react';
import { Typography, Paper, InputBase, IconButton, Container, Select, MenuItem, FormControl } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchResultList from './SearchResultList';
import noResult from '../../images/noResult.png';
import Hangul from 'hangul-js';
import CustomInputBase from '../CustomMUI/CustomInputBase';
import formatDate from '../../utils/formatDate';
import NoticeDetail from './NoticeDetail';

const FavNotices = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('id');
    const [selectedNotice, setSelectedNotice] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    const handleNoticeClick = (notice) => {
        if(selectedNotice !== null) {
            setSelectedNotice(null);
        } else {
            setSelectedNotice(notice);
        }
    };
    
    const dummyData = [
        {
        id: 1,
        department: '국제교류부',
        title: '2023년도 국제교류 장학생 선발 공고',
        keywords: ['교내', '국제교류', '교환학생'],
        applyEndAt: '2023-09-09',
        viewCount: 999,

        stuNum: 1,
        benefit: '학기당 100만원',
        method: {
            submitTo: '이메일 접수 skkujanghak@skku.edu',
            submitLists: '재학증명서, 성적증명서, 등록금 고지서, 추천서',
            submitDate: '2023-08-13',
        },
        target: '전공무관, 학부 2학년 이상 학생, GPA 3.6 이상',
        inquiry: '학생지원팀 02-760-1167',
        link: 'https://www.skku.edu/skku/campus/skk_comm/notice06.do?mode=view&articleNo=108203&article.offset=0&articleLimit=10',
        },
        {
        id: 2,
        department: '학생복지부',
        title: '2023년도 학생복지 장학생 선발 공고',
        keywords: ['교내', '학생복지', '직전학기 3.5 이상'],
        applyEndAt: '2023-08-15',
        viewCount: 234,
        stuNum: 1,
        benefit: '학기당 100만원',
        method: {
            submitTo: '이메일 접수 skkujanghak@skku.edu',
            submitLists: '재학증명서, 성적증명서, 등록금 고지서, 추천서',
            submitDate: '2023-08-13',
        },
        target: '전공무관, 학부 2학년 이상 학생, GPA 3.6 이상',
        inquiry: '학생지원팀 02-760-1167',
        link: 'https://www.skku.edu/skku/campus/skk_comm/notice06.do?mode=view&articleNo=108203&article.offset=0&articleLimit=10',
        },
    ];

    const searchChosung = (text) => {
        return Hangul.disassemble(text).filter((char) => Hangul.isCho(char)).join('');
    };
    
    const filteredData = dummyData.filter((data) => {
        return (
            data.applyEndAt !== null && (
          searchChosung(data.department).includes(searchChosung(searchTerm)) ||
          searchChosung(data.title).includes(searchChosung(searchTerm)) ||
          (data.keywords && data.keywords.some((keyword) => searchChosung(keyword).includes(searchChosung(searchTerm))))
        ));
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortType === 'id') {
          return b.id - a.id;
        } else if (sortType === 'applyEndAt') {
          return new Date(a.applyEndAt) - new Date(b.applyEndAt);
        } else if (sortType === 'viewCount') {
          return b.viewCount - a.viewCount;
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
        <Typography variant="h5" sx={{ fontWeight: 900, margin: '20px 0px' }}>관심 장학</Typography>
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
        <div style={{ display:'flex', justifyContent:'space-between'}}>
            <Typography variant="body2" sx={{ fontWeight: 500, margin: '24px 0px'}}>검색 결과 {filteredData.length} 건</Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100, justifyContent: 'center' }}>
                <Select
                    value={sortType}
                    onChange={handleSortChange}
                    input={<CustomInputBase />}
                    sx={{fontSize: '14px'}}
                >
                    <MenuItem value="id" sx={{fontSize: '14px'}} >최신순</MenuItem>
                    <MenuItem value="applyEndAt" sx={{fontSize: '14px'}}>마감일순</MenuItem>
                    <MenuItem value="viewCount" sx={{fontSize: '14px'}}>조회순</MenuItem>
                </Select>
            </FormControl>
        </div>
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

export default FavNotices;
