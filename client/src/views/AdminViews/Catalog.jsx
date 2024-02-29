import React from 'react';

import SideBar from '../../components/Sidebar';
import CatalogTable from '../../components/AdminCatalogTable';

function Catalog() {
	return (
		<>
			<SideBar />
			<div className='admin-page-content'>
				<CatalogTable />
			</div>
		</>
	);
}

export default Catalog;