import { styled } from '@mui/material/styles';

const CustomTextField = styled('input')(() => ({
    border: 'none',
    outline: 'none',
    padding: '15px 20px',
    width: '100%',
    backgroundColor: '#f5f5f5',
    boxSizing: 'border-box', 
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 500,
  }));

export default CustomTextField;
  