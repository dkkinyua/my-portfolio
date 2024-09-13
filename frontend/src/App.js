import React from 'react';
import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import TopHeader from './components/TopHeader';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <TopHeader />
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
