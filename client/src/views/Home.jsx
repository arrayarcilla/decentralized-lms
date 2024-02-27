import React from 'react';

import SideBar from '../components/Sidebar'
// import { EthProvider } from "../contexts/EthContext";

function  Home() {
	return (
		<>
			{/* <EthProvider> */}
				<SideBar />
				<div class='content'>
					<h1>Home Page</h1>
				</div>
			{/* </EthProvider> */}
		</>
	)
}

export default Home;