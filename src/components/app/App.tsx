import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import AuthProvider from '../googleLogin/firebase';



const App: React.FC = () => {
  return (
    
    <Router>
      <AuthProvider/>
      <Routes>
        <Route path="/" element={<CharList/>} />
        <Route path="/character/:id" element={<CharInfo />} />
      </Routes>
    </Router>
  );
};

export default App;