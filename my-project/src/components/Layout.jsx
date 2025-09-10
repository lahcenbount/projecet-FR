import React from 'react';
import Header from './ui/Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
