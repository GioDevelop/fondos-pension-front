import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.js';
import Aperturas from './pages/Home.js';
import Cancelaciones from './pages/Cancelaciones.js';
import Historial from './pages/Historial.js';

function App() {
  return (
    <Router>
    
    <div style={{ display: 'flex' }}>
        <NavBar />
        <main style={{ flexGrow: 1, padding: '16px' }}>
          <Routes>
            <Route path="/" element={<Aperturas />} />
            <Route path="/cancelaciones" element={<Cancelaciones />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </main>
      </div>
  </Router>
    
  );
}

export default App;
