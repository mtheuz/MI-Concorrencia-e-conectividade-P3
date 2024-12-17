import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeWeb3 } from './utils/web3';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDatails';
import CloseEvent from './pages/CloseEvent';
import ClaimWinnings from './pages/ClaimWinnings';

const App = () => {
  useEffect(() => {
    initializeWeb3();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/close" element={<CloseEvent />} />
        <Route path="/claim" element={<ClaimWinnings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
