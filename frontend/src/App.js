import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
  },
  palette: {
    primary: {
      main: '#249c28',
    },
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ height: '100%', width: '100vw'}}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signUp" element={<SignUp/>} />
            {/* <Route path="/myPage" element={<MyPage/>} /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
