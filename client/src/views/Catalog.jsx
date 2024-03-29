import React from 'react';

import SideBar from '../components/Sidebar';
import CatalogTable from '../components/CatalogTable';

function Catalog() {
	return (
		<>
			<SideBar />
			<div class='content'>
				<CatalogTable />
			</div>
		</>
	);
}

export default Catalog;