import Router from './routes';
import React, { useEffect } from 'react';
function App() {
  function setScreenSize() {
    const vh: number = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return <Router />;
}

export default App;
