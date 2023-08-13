import React from 'react';
import { Typography, Select, MenuItem, FormControl } from "@mui/material";
import CustomInputBase from '../CustomInputBase';

const NoticeFilter = ({ sortType, handleSortChange, filteredDataLength }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ fontWeight: 500, margin: '24px 0px' }}>검색 결과 {filteredDataLength} 건</Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100, justifyContent: 'center' }}>
        <Select
          value={sortType}
          onChange={handleSortChange}
          input={<CustomInputBase />}
          sx={{ fontSize: '14px' }}
        >
          <MenuItem value="id" sx={{ fontSize: '14px' }}>최신순</MenuItem>
          <MenuItem value="dateEnd" sx={{ fontSize: '14px' }}>마감일순</MenuItem>
          <MenuItem value="views" sx={{ fontSize: '14px' }}>조회순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default NoticeFilter;
