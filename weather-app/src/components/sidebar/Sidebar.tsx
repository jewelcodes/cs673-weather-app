import React from 'react';
import './Sidebar.css';
import SidebarPlace from './SidebarPlace.tsx';

function Sidebar(props:any) {
    return (
        <div className="sidebar">
            {/* obv just testing */}
            <SidebarPlace active={true} place="Boston" />
            <SidebarPlace place="New York" />
            <SidebarPlace place="London" />
        </div>
    );
}

export default Sidebar;
