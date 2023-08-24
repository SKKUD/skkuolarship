import React, { useEffect } from 'react';
import { Paper, Typography, Divider, Container, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import parseApplyMethod from '../../utils/parseApplyMethod';

const NoticeDetail = ({ notice }) => {
    let currentNumber = 1;
    
    useEffect(() => {
      console.log(notice);
    }, [notice]);

    const renderSubtitle = (title, content) => (
      (content !== null && content !== "") && (
        <Typography variant="subtitle1" sx={{ fontWeight: 600, marginTop: '12px' }}>
          <span style={{ fontWeight: 900 }}>{currentNumber++}. {title}</span> : {content}
        </Typography>
      )
    );

    return (
      <Paper elevation={3} sx={{ padding: '25px', margin: '15px', borderRadius: '15px' }}>
        <Container sx={{p: 3 }}>
          <IconButton sx={{p: '0', mb: '5px'}}>
            <FavoriteIcon />
          </IconButton>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{notice.title}</Typography>
            {notice.daysLeft !== undefined ? (
              notice.daysLeft >= 0 ? (
                <Chip
                  label={notice.daysLeft === 0 ? 'D-day' : `D-${notice.daysLeft}`}
                  style={{
                    backgroundColor: notice.daysLeft === 0 ? '#FF6D60' : '#609966',
                    color: 'white',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    margin: '10px 0 0',
                  }}
                />
              ) : (
                <Chip
                  label="모집 완료"
                  style={{ backgroundColor: 'darkgray', color: 'white', borderRadius: '10px', fontWeight: 'bold', margin: '10px 0 0', }}
                />
              )
            ) : null}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px'}}>
            <div>
              {notice.keywords &&
                notice.keywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    sx={{ m: '0px 10px 10px 0px', p: '5px', backgroundColor: '#EDF1D6' }}
                    label={`#${keyword}`}
                  />
                ))}
            </div>
            <Typography variant="body2" sx={{ fontWeight: 500, p: '0 3px' }}>조회수: {notice.viewCount}</Typography>
          </div>
          <Divider sx={{ margin: '15px 0 20px' }} />
              {renderSubtitle('신청기간', notice.applyEndAt ? `~ ${notice.applyEndAt}` : null)}
              {renderSubtitle('선발인원', notice.numSelection ? `${notice.numSelection}` : null)}
              {renderSubtitle('선발혜택', notice.benefit ? notice.benefit : null)}
              {renderSubtitle('접수방법', notice.applyMethod ? (
                parseApplyMethod(notice.applyMethod)
              ) : null)}
              {renderSubtitle('지원대상', notice.target ? notice.target : null)}
              {renderSubtitle('문의', notice.inquiry ? notice.inquiry : null)}
              {renderSubtitle('링크', notice.originUrl ? (
                <a href={notice.originUrl} target="_blank" rel="noopener noreferrer" style={{color: 'green', fontWeight: 'bold'}}>
                  🚀 원본 링크로 이동하기 🚀 
                </a>
              ) : null)}
          </Container>
      </Paper>
    );
};

export default NoticeDetail;
