import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharList/>} />
        <Route path="/character/:id" element={<CharInfo />} />
      </Routes>
    </Router>
  );
};

export default App;