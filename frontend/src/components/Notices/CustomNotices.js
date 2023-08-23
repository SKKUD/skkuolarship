import { useState, useEffect } from 'react';
import { Typography, Paper, InputBase, IconButton, Container, Select, MenuItem, FormControl } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchResultList from './SearchResultList';
import noResult from '../../images/noResult.png';
import Hangul from 'hangul-js';
import CustomInputBase from '../CustomMUI/CustomInputBase';
import formatDate from '../../utils/formatDate';

const CustomNotices = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('id');
    const [notices, setNotices] = useState([]); 

    useEffect(() => {
        fetch('/all') 
            .then(response => response.json())
            .then(data => setNotices(data))
            .catch(error => console.error('데이터 불러오기 오류:', error));
    }, []); 

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    const searchChosung = (text) => {
        return Hangul.disassemble(text).filter((char) => Hangul.isCho(char)).join('');
    };
    
    const filteredData = notices.filter((data) => {
        return (
            data.applyEndAt !== null &&
          (searchChosung(data.department).includes(searchChosung(searchTerm)) ||
          searchChosung(data.title).includes(searchChosung(searchTerm)) ||
          (data.keywords && data.keywords.some((keyword) => searchChosung(keyword).includes(searchChosung(searchTerm)))))
        );
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
        <Typography variant="h5" sx={{ fontWeight: 900, margin: '20px 0px' }}>추천 장학</Typography>
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
        {
            updatedData.length === 0 ? 
            <Container sx={{textAlign: 'center'}}>
                <img src={noResult} alt="noResult" width={256} />
                <Typography variant="body1" sx={{ fontWeight: 700, margin: '24px 0px'}}>검색 결과가 없습니다. <br/> 다른 검색어를 입력해주세요!</Typography> 
            </Container>
            :<SearchResultList data={updatedData} />
        }
        </>
    );
};

export default CustomNotices;
