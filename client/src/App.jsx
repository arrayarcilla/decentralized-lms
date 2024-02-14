import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";
import Catalog from "./views/Catalog";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SideBar />}/>
          <Route path='/catalog' element={<Catalog />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
