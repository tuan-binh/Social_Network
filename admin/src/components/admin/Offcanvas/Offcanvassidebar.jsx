import "./Offcanvas.scss";

import { Link, useNavigate } from "react-router-dom";

import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";

function Offcanvassidebar({ show, handleClose }) {
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("checkAdmin");
    window.location.href = "/";
  }

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="side-bar">
          <p onClick={() => navigate("/")}>
            <Link>Quản Lý Bài Viết</Link>
          </p>
          <p onClick={() => navigate("/usermanager")}>
            <Link>Quản Lý Người Dùng</Link>
          </p>
          <p onClick={handleLogOut}>
            <Link>Đăng Xuất</Link>
          </p>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Offcanvassidebar;
