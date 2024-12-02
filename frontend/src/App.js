import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import TopHeader from './components/TopHeader';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import BlogScreen from './screens/BlogScreen';
import PostScreen from './screens/PostScreen';
import ProjectScreen from './screens/ProjectScreen';

function App() {

  const [darkMode, setDarkMode] = useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#28282B' : '#fff',
        paper: darkMode ? '#28282B' : '#fff',
      },
      text: {
        primary: darkMode ? '#E5E4E2' : '#000',
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <TopHeader />
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/contact-me' element={<ContactScreen />} />
            <Route path='/posts' element={<BlogScreen />} />
            <Route path='/projects' element={<ProjectScreen />} />
            <Route path='/posts/:id' element={<PostScreen />} />
          </Routes>
        </main>
        <Footer darkMode={darkMode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;