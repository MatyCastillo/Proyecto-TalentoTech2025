import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import React from 'react';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
