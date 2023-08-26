import React, { useState } from 'react';
import { Dialog, List, ListItem, IconButton, TextField, Select, MenuItem, FormControl, InputLabel, Autocomplete, Typography, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
  
const UserInfoDialog = ({ open, onClose, userInfo, setUserInfo }) => {
    const [editMode, setEditMode] = useState(false);
    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        setEditMode(false);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <List sx={{ width: '330px', p: 2 }}>
                <div>
                <Typography variant="h4" sx={{fontWeight: 800, textAlign: 'center', pt: 3}}>👻 </Typography>
                <Typography sx={{fontWeight: 800, textAlign: 'center', fontSize: '24px', pb: 1}}>{userInfo.username} 님</Typography>
                {editMode ? (
                    <Container>
                        <ListItem >
                            <FormControl fullWidth>
                                <InputLabel id="semester-select-label">현재학기</InputLabel>
                                <Select
                                    labelId="semester-select-label"
                                    id="semester-select"
                                    value={userInfo.semester}
                                    label="현재학기"
                                    onChange={(e) => setUserInfo({ ...userInfo, semester: e.target.value })}
                                >
                                    <MenuItem value={1}>1학기</MenuItem>
                                    <MenuItem value={2}>2학기</MenuItem>
                                    <MenuItem value={3}>3학기</MenuItem>
                                    <MenuItem value={4}>4학기</MenuItem>
                                    <MenuItem value={5}>5학기</MenuItem>
                                    <MenuItem value={6}>6학기</MenuItem>
                                    <MenuItem value={7}>7학기</MenuItem>
                                    <MenuItem value={8}>8학기</MenuItem>
                                    <MenuItem value={9}>9학기 이상</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth >
                                <InputLabel id="registration-status-select-label">등록상태</InputLabel>
                                <Select
                                    labelId="registration-status-select-label"
                                    id="registration-status-select"
                                    value={userInfo.enrollStatus}
                                    label="등록상태"
                                    onChange={(e) => setUserInfo({ ...userInfo, enrollStatus: e.target.value })}
                               >
                                    {['enrolled', 'absence', 'certificated'].map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value === 'enrolled' ? '재학' : value === 'absence' ? '휴학' : '수료'}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <TextField
                                type="number"
                                label="전체학기 평점"
                                value={userInfo.gpa}
                                onChange={(e) => setUserInfo({...userInfo, gpa: e.target.value})}
                                fullWidth
                                inputProps={{ step: 0.1 }} 
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                type="number"
                                label="직전학기 평점"
                                value={userInfo.lastSemGpa}
                                onChange={(e) => setUserInfo({...userInfo, lastSemGpa: e.target.value})}
                                fullWidth
                                inputProps={{ step: 0.1 }} 
                            />
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth>
                                <InputLabel id="incomeBracket-quintile-select-label">소득 분위</InputLabel>
                                <Select
                                    labelId="incomeBracket-quintile-select-label"
                                    id="incomeBracket-quintile-select"
                                    value={userInfo.incomeBracket}
                                    label="소득 분위"
                                    onChange={(e) => setUserInfo({...userInfo, incomeBracket: e.target.value})}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <MenuItem key={value} value={value}>{value}분위</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                                <FormControl fullWidth >
                                    <InputLabel id="residence-select-label">거주지</InputLabel>
                                    <Select
                                        labelId="residence-select-label"
                                        id="residence-select"
                                        value={userInfo.residence}
                                        label="거주지"
                                        onChange={(e) => setUserInfo({...userInfo, residence: {...userInfo.residence, residence: e.target.value}})}
                                        >
                                        {['강원', '경기', '경상', '광주', '대구', '대전', '부산', '서울', '세종', '울산', '인천', '전라', '제주', '충청'].map((region) => (
                                            <MenuItem key={region} value={region}>{region}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            {/* {['강원', '경기', '경상', '전라', '충청', '서울'].includes(userInfo.residenceInfo.residence) && (
                                <ListItem>
                                    <FormControl fullWidth >
                                        <InputLabel id="city-select-label">시/군/구</InputLabel>
                                        <Select
                                            labelId="city-select-label"
                                            id="city-select"
                                            value={userInfo.residence}
                                            label="시/군/구"
                                            onChange={(e) => setUserInfo({...userInfo, residenceInfo: {...userInfo.residenceInfo, city: e.target.value}})}
                                        >
                                            {cities[userInfo.residenceInfo.residence].map((city) => (
                                                <MenuItem key={city} value={city}>{city}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                        )} */}
                        <ListItem sx={{justifyContent: 'flex-end'}}>
                            <IconButton onClick={handleSaveClick}>
                                <SaveIcon />
                            </IconButton>
                        </ListItem>
                    </Container>
                ) : (
                    <Container>
                        <ListItem>
                            <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>성별 </Typography>
                            <Typography variant="body1">{userInfo.gender === "female"? "여자" : "남자"}</Typography>                        
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>현재학기 </Typography>
                            <Typography variant="body1">{userInfo.semester}학기</Typography>   
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>등록상태 </Typography>
                            <Typography variant="body1">{userInfo.enrollStatus === 'enrolled' ? '재학' : userInfo.enrollStatus === 'absence' ? '휴학' : '수료'}</Typography> 
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>전공 </Typography>
                            <Typography variant="body1">{userInfo.major}</Typography> 
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>전체학기 평점 </Typography>
                            <Typography variant="body1">{userInfo.gpa} <b>/ 4.5</b></Typography> 
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>직전학기 평점 </Typography>
                            <Typography variant="body1">{userInfo.lastSemGpa} <b>/ 4.5</b></Typography> 
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>소득분위 </Typography>
                            <Typography variant="body1">{userInfo.incomeBracket}분위</Typography> 
                        </ListItem>
                        <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>거주지 </Typography>
                                <Typography variant="body1">{userInfo.residence}</Typography>
                        </ListItem>
                        <ListItem sx={{justifyContent: 'flex-end'}}>
                            <IconButton onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                    </Container>
                )}
                </div>
            </List>
        </Dialog>
    );
};

export default UserInfoDialog;
