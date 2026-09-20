import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TopHeader from './components/TopHeader';
import Header from './components/Header';
import Footer from './components/Footer';
import NowPlaying from './components/NowPlaying';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
// import BlogScreen from './screens/BlogScreen';
import PostScreen from './screens/PostScreen';
import ProjectScreen from './screens/ProjectScreen';
import PotfolioScreen from './screens/PotfolioScreen';

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  })

  // shadcn themes switch on the `dark` class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    } catch {}
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  return (
    <Router>
      <div className='flex min-h-screen flex-col'>
        <TopHeader />
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/contact-me' element={<ContactScreen />} />
            <Route path='/posts' element={<PostScreen />} />
            <Route path='/projects' element={<ProjectScreen />} />
            <Route path='/potfolio' element={<PotfolioScreen />} />
            <Route path='/posts/:id' element={<PostScreen />} />
          </Routes>
        </main>
        <Footer />
        <NowPlaying />
      </div>
    </Router>
  );
}

export default App;
