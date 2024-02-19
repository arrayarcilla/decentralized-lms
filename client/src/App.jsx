import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SideBar from './components/Sidebar';
import CatalogTable from './components/CatalogTable';
import MemberTable from './components/MemberTable';


//--- Views Imports
import Home from './views/Home';

import Catalog from './views/Catalog';
import Categories from './views/Categories';
import Authors from './views/Authors';
import Publishers from './views/Publishers';
import Tags from './views/Tags';

import Member from './views/Member';
import Circulation from './views/Circulation';
import FeesAndPayments from './views/FeesAndPayments';

function App() {
	return (
		<BrowserRouter>
		
			<Routes>
				<Route path='/' element={<Home />}/>

				<Route path='/catalog' element={<Catalog />} />
				<Route path='/categories' element={<Categories />} />
				<Route path='/authors' element={<Authors />} />
				<Route path='/publishers' element={<Publishers />} />
				<Route path='/tags' element={<Tags />} />

				<Route path='/member' element={<Member />} />
				<Route path='/circulation' element={<Circulation />} />
				<Route path='/fees-and-payments' element={<FeesAndPayments />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
