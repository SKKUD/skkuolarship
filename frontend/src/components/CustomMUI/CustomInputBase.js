import { InputBase } from '@mui/material';

const CustomInputBase = (props) => (
    <InputBase
      sx={{
        '& .MuiSelect-select': {
          '&:focus': {
            backgroundColor: 'transparent', 
          },
          '&:before, &:after': {
            display: 'none', 
          },
          '&:hover:not(.Mui-disabled):before': {
            display: 'none',
          },
        },
      }}
      {...props}
    />
  );

  
export default CustomInputBase;