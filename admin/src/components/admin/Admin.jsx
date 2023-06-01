import "./Admin.scss";

import { Link, Outlet } from "react-router-dom";

import React from "react";
import { useState } from "react";

function Admin() {
  function handleLogOut() {
    localStorage.removeItem("checkAdmin");
    window.location.href = "/";
  }

  return (
    <div className="flex-admin">
      <div className="tabs">
        <Link to={"/"}>
          <p>Quản Lý Bài Viết</p>
        </Link>
        <Link to={"/usermanager"}>
          <p>Quản Lý Người Dùng</p>
        </Link>
        <Link to={"/"} onClick={handleLogOut}>
          <p>Đăng Xuất</p>
        </Link>
      </div>
      <div className="manager">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
