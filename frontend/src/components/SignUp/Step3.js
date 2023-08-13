import React, { useState } from 'react';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const Step3 = ({ onNext }) => {
    const [income, setIncome] = useState('');
    const [averageGrade, setAverageGrade] = useState('');
    const [lastSemesterGrade, setLastSemesterGrade] = useState('');
    const [residence, setResidence] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const isDisabled =
        income === '' ||
        averageGrade === '' ||
        lastSemesterGrade === '' ||
        residence === '';

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
        setResidence(e.target.value);
        setDetailAddress('');
    };
    
    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
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
                <MenuItem value={1}>1분위</MenuItem>
                <MenuItem value={2}>2분위</MenuItem>
                <MenuItem value={3}>3분위</MenuItem>
                <MenuItem value={4}>4분위</MenuItem>
                <MenuItem value={5}>5분위</MenuItem>
                <MenuItem value={6}>6분위</MenuItem>
                <MenuItem value={7}>7분위</MenuItem>
                <MenuItem value={8}>8분위</MenuItem>
                <MenuItem value={9}>9분위</MenuItem>
                <MenuItem value={10}>10분위</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="residence-select-label">거주지</InputLabel>
            <Select
                labelId="residence-select-label"
                id="residence-select"
                value={residence}
                label="거주지"
                onChange={handleResidenceChange}
            >
                {['강원', '경기', '경상', '광주', '대구', '대전', '부산', '서울', '세종', '울산', '인천', '전라', '제주', '충청'].map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
            </Select>
            </FormControl>
            {residence === '서울' && (
            <TextField
                type="text"
                label="서울시 OO구"
                value={detailAddress}
                onChange={handleDetailAddressChange }
                fullWidth
                sx={{ mb: 3 }}
            />
            )}
            {['강원', '경기', '경상', '전라', '충청'].includes(residence) && (
            <TextField
                type="text"
                label={residence + '도 OO시 / OO군'}
                value={detailAddress}
                onChange={handleDetailAddressChange }
                fullWidth
                sx={{ mb: 3 }}
            />
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
