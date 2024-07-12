import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import TopBar from './TopBar'
import SideBar from './SideBar'
import ContentMain from './ContentMain'

function MainLayout() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

    return (
        <div className="admin">
            <div className={["layout-fixed sidebar-expand-lg bg-body-tertiary", isSideBarOpen ? "sidebar-open" : "sidebar-collapse"].filter(Boolean).join(' ')}>
                <div className="app-wrapper">
                    <TopBar toggleSideBar={toggleSideBar} />
                    <SideBar isSideBarOpen={isSideBarOpen} />
                    <ContentMain>
                        <Outlet />
                    </ContentMain>
                    <div className="sidebar-overlay" onClick={toggleSideBar} onTouchStart={toggleSideBar}></div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
