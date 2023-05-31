import React from "react";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="side">
      <h2>Department</h2>
      <ul className="department">
        <li>
          <i className="fa-solid fa-people-group"></i> IT
        </li>
        <li>
          <i className="fa-solid fa-people-group"></i> Marketing
        </li>
        <li>
          <i className="fa-solid fa-people-group"></i> Sell
        </li>
        <li>
          <i className="fa-solid fa-people-group"></i> Operate
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
