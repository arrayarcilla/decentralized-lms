import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//--- Views Imports
import LandingPage from './views/LandingPage';

import Dashboard from './views/Dashboard';
import Catalog from './views/Catalog';
import Categories from './views/Categories';
import Authors from './views/Authors';
import Publishers from './views/Publishers';
import Tags from './views/Tags';

import Member from './views/Member';
import Circulation from './views/Circulation';
import FeesAndPayments from './views/FeesAndPayments';
import { EthProvider } from "./contexts/EthContext";

function App() {
	return (
		<EthProvider>
			<BrowserRouter>
		
				<Routes>
					<Route path='/' element={<LandingPage />} />

					<Route path='/dashboard' element={<Dashboard />} />
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
		</EthProvider>
		
	);
}

export default App;
