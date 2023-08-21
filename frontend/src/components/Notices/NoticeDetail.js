import React from 'react';
import { Paper, Typography, Divider, Container, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const NoticeDetail = ({ notice }) => {
  const renderSubtitle = (number, title, content) => (
    content && (
      <Typography variant="subtitle1" sx={{ fontWeight: 600, marginTop: '12px' }}>
        <span style={{ fontWeight: 900 }}>{number}. {title}</span> : {content}
      </Typography>
    )
  );

  let currentNumber = 1;

  return (
    <Paper elevation={3} sx={{ padding: '25px', margin: '15px', borderRadius: '15px' }}>
      <Container sx={{p: 3}}>
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
          <Typography variant="body2" sx={{ fontWeight: 500, p: '0 3px' }}>조회수: {notice.views}</Typography>
        </div>
        <Divider sx={{ margin: '15px 0 20px' }} />
          {renderSubtitle(currentNumber++, '신청기간', `~ ${notice.dateEnd}`)}
          {renderSubtitle(currentNumber++, '선발인원', `${notice.stuNum} 명`)}
          {renderSubtitle(currentNumber++, '접수방법', (
            <ul>
              {notice.method.submitTo && <li><span style={{ fontWeight: 900 }}>제출처:</span> {notice.method.submitTo}</li>}
              {notice.method.submitLists && <li><span style={{ fontWeight: 900 }}>제출서류:</span> {notice.method.submitLists}</li>}
              {notice.method.submitDate && <li><span style={{ fontWeight: 900 }}>제출기한:</span> {notice.method.submitDate}</li>}
            </ul>
          ))}
          {renderSubtitle(currentNumber++, '지원대상', notice.target)}
          {renderSubtitle(currentNumber++, '문의', notice.inquiry)}
          {renderSubtitle(currentNumber++, '링크', (
            <a href={notice.link} target="_blank" rel="noopener noreferrer">
              {notice.link}
            </a>
          ))}
        </Container>
    </Paper>
  );
};

export default NoticeDetail;
