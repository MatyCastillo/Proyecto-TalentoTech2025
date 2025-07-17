// src/components/layout/MainLayout.jsx

import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div>
    <Navbar /> 
    <main>
      <Outlet /> 
    </main>
  </div>
);

export default MainLayout;
