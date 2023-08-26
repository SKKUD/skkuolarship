import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SplashScreen from './pages/SplashScreen';

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
  const [isLogin, setIsLogin] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ height: '100%', width: '100vw'}}>
        <Routes>
            <>
              <Route path="/" element={<SplashScreen setShowSplash={setShowSplash} />} />
              <Route path="/home" element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />} />
              <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
              <Route path="/signUp" element={<SignUp/>} />
            </>
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
