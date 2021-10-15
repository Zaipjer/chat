import React from 'react';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = () => {

    const user = useSelector((state) => state.user.user);

    return (
        <div className="sidebar">
            <h4>Welcome</h4>
            <h4>{user?.displayName}</h4>
        </div>
    );
}

export default Sidebar;