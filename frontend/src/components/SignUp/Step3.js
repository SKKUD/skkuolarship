import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const cities = {
  서울: [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구',
    '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구',
    '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구',
    '은평구', '종로구', '중구', '중랑구'
  ],
  경기: [
    '가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시',
    '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시',
    '안산시', '안성시', '안양시', '양주시', '양평군', '여주군', '연천군', '오산시',
    '용인시', '의왕시', '의정부시', '이천시'
  ],
  충청: [
    '천안시', '청주시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시',
    '당진시', '금산군', '연기군', '부여군', '서천군', '청양군', '홍성군', '예산군',
    '태안군'
  ],
  전라: [
    '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군',
    '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'
  ],
  경상: [
    '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시',
    '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군',
    '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'
  ],
  강원: [
    '강릉시', '동해시', '속초시', '원주시', '춘천시', '태백시', '삼척시', '홍천군',
    '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군',
    '고성군', '양양군'
  ],
};

const Step3 = ({ onNext }) => {
    const [income, setIncome] = useState('');
    const [averageGrade, setAverageGrade] = useState('');
    const [lastSemesterGrade, setLastSemesterGrade] = useState('');
    const [residenceInfo, setResidenceInfo] = useState({ residence: '', city: '' });

    useEffect(() => {
        console.log(residenceInfo);
    }, [residenceInfo]);
    
    const isDisabled =
        income === '' ||
        averageGrade === '' ||
        lastSemesterGrade === '' ||
        residenceInfo.residence === '' ||
        (['강원', '경기', '경상', '전라', '충청'].includes(residenceInfo.residence) && residenceInfo.city === '');

    const handleIncomeChange = (e) => {
        setIncome(e.target.value);
    };

    const handleAverageGradeChange = (e) => {
        setAverageGrade(e.target.value);
    };

    const handleLastSemesterGradeChange = (e) => {
        setLastSemesterGrade(e.target.value);
    };

    const handleResidenceChange = (e) => {
        setResidenceInfo({ residence: e.target.value, city: '' });
    };
    
    const handleCityChange = (e) => {
        setResidenceInfo({ ...residenceInfo, city: e.target.value });
    };

    return (
        <>
        <form>
            <TextField
            type="number"
            label="전체학기 평점"
            value={averageGrade}
            onChange={handleAverageGradeChange}
            fullWidth
            inputProps={{ step: 0.1 }} 
            sx={{ mb:3 }}
            />
            <TextField
            type="number"
            label="직전학기 평점"
            value={lastSemesterGrade}
            onChange={handleLastSemesterGradeChange}
            fullWidth
            inputProps={{ step: 0.1 }} 
            sx={{ mb:3 }}
            />
            <FormControl fullWidth sx={{ mb:3 }}>
            <InputLabel id="income-quintile-select-label">소득 분위</InputLabel>
            <Select
                labelId="income-quintile-select-label"
                id="income-quintile-select"
                value={income}
                label="소득 분위"
                onChange={handleIncomeChange}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <MenuItem key={value} value={value}>{value}분위</MenuItem>
                ))}
            </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="residence-select-label">거주지</InputLabel>
            <Select
                labelId="residence-select-label"
                id="residence-select"
                value={residenceInfo.residence}
                label="거주지"
                onChange={handleResidenceChange}
            >
                {['강원', '경기', '경상', '광주', '대구', '대전', '부산', '서울', '세종', '울산', '인천', '전라', '제주', '충청'].map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
            </Select>
            </FormControl>
            {['강원', '경기', '경상', '전라', '충청', '서울'].includes(residenceInfo.residence) && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="city-select-label">시/군/구</InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={residenceInfo.city}
                    label="시/군/구"
                    onChange={handleCityChange}
                >
                    {cities[residenceInfo.residence].map((city) => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <Box mt={2}>
            <Button
                variant="standard"
                fullWidth
                onClick={onNext}
                sx={{
                backgroundColor: isDisabled ? 'transparent' : 'green',
                '&:hover': {
                    backgroundColor: isDisabled ? 'transparent' : 'darkgreen',
                },
                color: isDisabled ? '#505050' : 'white',
                p: 1,
                fontSize: '16px',
                }}
            >
                완료
            </Button>
            </Box>
        </form>
        </>
    );
};

export default Step3;