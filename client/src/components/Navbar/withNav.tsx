// WithNav.js (Stand-alone Functional Component)
import React from 'react';
import Navbar from './navbar';
import { Outlet } from 'react-router';

const WithNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default WithNav;