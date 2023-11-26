import React from 'react';
import Sidebar from '../../Components/DashboardComp/Sidebar';
import Nav from '../../Components/DashboardComp/Nav';
import { useState } from 'react';
import './dashboardpage.css';
import DashFooter from '../../Components/DashboardComp/DashFooter';
import DashRegist from '../../Components/DashboardComp/DashRegist';

const DashRegistPage = () => {
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container-fluid min-vh-100 container-bg">
      {toggle && <div></div>}
      <div>
        <Nav Toggle={Toggle} />
      </div>
      <div className="row">
        {toggle && (
          <div className="col-3 col-md-2 bg-white vh-100 position-fixed sidebar-onpage">
            <Sidebar />
          </div>
        )}
        {toggle && <div className="col-3 col-md-2"></div>}
        <div className="col mt-4">
          <DashRegist />
          <DashFooter />
        </div>
      </div>
    </div>
  );
};

export default DashRegistPage;
