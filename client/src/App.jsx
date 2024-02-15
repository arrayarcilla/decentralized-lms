import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";
import CatalogTable from './components/CatalogTable';
import MemberTable from './components/MemberTable';

import Catalog from "./views/Catalog";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element=
          {
              <SideBar />
          }/>
          <Route path='/page2' element={<CatalogTable />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
