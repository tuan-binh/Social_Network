import "./Navbar.scss";

import { Link, NavLink } from "react-router-dom";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { reloadPosts } from "../../../Store/reducerPost";

function Navbar({ changeMode }) {
  const status = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  const [textSearch, setTextSearch] = useState("");
  const [dataUser, setDataUser] = useState([]);

  function handleLogOut() {
    localStorage.removeItem("checkLogin");
    window.location.href = "/";
  }

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataUserLogin"))
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users?username_like=${textSearch}`)
      .then((res) => setDataUser(res.data))
      .catch((err) => console.log(err));
  }, [textSearch, status]);

  return (
    <nav>
      <div className="logo">
        <Link to={"/"}>
          <div className="image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/upload-img-a4d0c.appspot.com/o/files%2Fdownload.png?alt=media&token=eb77f238-2fc7-4205-ba42-0762091a0d1e"
              alt=""
            />
          </div>
        </Link>
        <input
          type="text"
          placeholder="Search Here..."
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
        />
      </div>
      <div className="tab">
        <NavLink to={"/"}>
          <i className="fa-solid fa-house"></i>
        </NavLink>
        <NavLink to={"/friends"}>
          <i className="fa-solid fa-flag"></i>
        </NavLink>
      </div>
      <div className="action">
        <div className="info">
          <div className="block-img">
            <Link
              to={`/information/${user.id}`}
              onClick={() => dispatch(reloadPosts())}
            >
              <img src={user.urlAvatar} alt="" />
            </Link>
          </div>
          <p style={{ margin: "0" }}>{user.username}</p>
        </div>
        <button className="Btn" onClick={handleLogOut}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>
      {textSearch ? (
        <ul className="listSearch">
          {dataUser.map((e, i) => {
            if (e.username !== user.username) {
              return (
                <Link>
                  <li key={i}>
                    <div>
                      <img src={e.urlAvatar} alt="" />
                    </div>
                    <p style={{ margin: "0" }}>{e.username}</p>
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
}

export default memo(Navbar);
