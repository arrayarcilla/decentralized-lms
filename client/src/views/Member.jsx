import React from 'react';

import SideBar from '../components/Sidebar';
import MemberTable from '../components/MemberTable';

function Member() {
	return (
		<>
			<SideBar />
			<div class='content'>
					<MemberTable />
			</div>
		</>
	)
}

export default Member;