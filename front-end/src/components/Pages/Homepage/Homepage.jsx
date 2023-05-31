import "./Homepage.scss";

import Navbar from "../../common/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import People from "../../common/People/People";
import React from "react";
import Sidebar from "../../common/Sidebar/Sidebar";
import { memo } from "react";

function Homepage({ changeMode }) {
  return (
    <div>
      <Navbar changeMode={changeMode} />

      <div className="body">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="route">
          <Outlet />
        </div>
        <div className="friends">
          <People />
        </div>
      </div>
    </div>
  );
}

export default memo(Homepage);
