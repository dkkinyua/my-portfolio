import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import TopHeader from './components/TopHeader';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import BlogScreen from './screens/BlogScreen';

function App() {
  return (
    <Router>
      <TopHeader />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/contact-me' element={<ContactScreen />}/>
          <Route path='/posts' element={<BlogScreen />}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
