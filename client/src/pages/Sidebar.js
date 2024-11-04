import React from 'react';

const Sidebar = ({ setActiveSection }) => {
    return (
        <div className="sidebar">
            <h2>Management Dashboard</h2>
            <ul>
                <li onClick={() => setActiveSection('buildings')}>Buildings</li>
                <li onClick={() => setActiveSection('offices')}>Offices</li>
                <li onClick={() => setActiveSection('employees')}>Employees</li>
            </ul>
        </div>
    );
};

export default Sidebar;
