import React from 'react';
import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import TopHeader from './components/TopHeader';

function App() {
  return (
    <Router>
      <Container>
        <TopHeader />
        <header className="App-header">
          Welcome to my Portfolio!
        </header>
      </Container>
    </Router>
  );
}

export default App;
