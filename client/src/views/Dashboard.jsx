import React from 'react';

import Sidebar from '../components/Sidebar';

function Dashboard() {
    return (
        <>
            <Sidebar />
            <div class='content'>
                <h1>Dashboard page</h1>
            </div>
        </>
    );
}

export default Dashboard;