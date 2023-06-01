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
        <Offcanvas.Title>
          <div className="info">
            <div>
              <img
                src="https://us.123rf.com/450wm/anatolir/anatolir2011/anatolir201105528/159470802-jurist-avatar-icon-flat-style.jpg?ver\u003d6"
                alt=""
              />
            </div>
            <p className="name">admin@gmail.com</p>
          </div>
        </Offcanvas.Title>
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
