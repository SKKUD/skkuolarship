import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import transformDepart from '../../utils/transformDepart';

const SearchResultList = ({ data, onNoticeClick, updateNotices, scrappedNoticeIds }) => {

  const handleScrapClick = (noticeId) => {
    const accessToken = localStorage.getItem('accessToken');
  
    fetch(`/scrap/${noticeId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      if (response.ok) {
        updateNotices();
      } else {
        console.error('스크랩 실패:', response.status);
      }
    })
    .catch(error => {
      console.error('스크랩 오류:', error);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '13%' }}>담당부서</TableCell>
            <TableCell style={{ width: '60%' }}>공고명</TableCell>
            <TableCell style={{ width: '12%' }}>마감일</TableCell>
            <TableCell style={{ width: '10%' }}>스크랩</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow 
              key={row.id}
              >
              <TableCell>{transformDepart(row.department)}</TableCell>
              <TableCell onClick={()=>onNoticeClick(row)}>
                {row.title}
                <div>
                  {row.keywords &&
                    row.keywords.slice(0, 5).map((keyword, index) => (
                      <Chip
                        key={index}
                        sx={{ m: '8px 10px 0px 0px', p: '3px' }}
                        label={`#${keyword}`}
                      />
                    ))}
                </div>
              </TableCell>
              <TableCell>
                {row.applyEndAt}
                <br />
                {row.daysLeft !== undefined ? (
                  row.daysLeft >= 0 ? (
                    <Chip
                      label={row.daysLeft === 0 ? 'D-day' : `D-${row.daysLeft}`}
                      style={{
                        backgroundColor: row.daysLeft === 0 ? '#FF6D60' : '#609966',
                        color: 'white',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                      }}
                    />
                  ) : (
                    <Chip
                      label="모집 완료"
                      style={{ backgroundColor: 'darkgray', color: 'white', borderRadius: '10px', fontWeight: 'bold', }}
                    />
                  )
                ) : null}
              </TableCell>
              <TableCell>
                <IconButton aria-label="add to favorites" onClick={() => handleScrapClick(row.id)} >
                  <FavoriteIcon 
                    color={(scrappedNoticeIds && scrappedNoticeIds.includes(row.id)) ? 'error' : 'inherit'}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResultList;