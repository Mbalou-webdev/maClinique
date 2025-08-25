import { useState } from 'react';
import '../index.css';
import Header from '../Admin/Header';
import Sidebar from '../Admin/Sideber'; // attention : Sideber → Sidebar
import Home from '../Admin/Home';

function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        {/* Header reçoit maintenant l'état */}
        <Header isSidebarOpen={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <Home />
      </div>
    </>
  );
}

export default Admin;
