import React from 'react';
import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import TopHeader from './components/TopHeader';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <TopHeader />
      <Header />
      <Container>
        <header className="App-header">
          Welcome to my Portfolio!
        </header>
      </Container>
    </Router>
  );
}

export default App;
