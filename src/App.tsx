import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './shared/components/Home';
import Admin from './shared/components/Admin';
import FlashRound from './shared/components/FlashRound';
import SliderDemo from './shared/components/SliderDemo';

export const RealtimeData = React.createContext({});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sliderAlex" element={<SliderDemo />}></Route>
        <Route path="/:id" element={<Home />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/flash/:id' element={<FlashRound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
