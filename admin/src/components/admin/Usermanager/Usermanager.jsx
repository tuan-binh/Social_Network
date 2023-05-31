import "./Usermanager.scss";

import React, { useEffect, useState } from "react";

import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import axios from "axios";

function Usermanager() {
  const [reload, setReload] = useState(false);

  // state user
  const [dataUser, setDataUser] = useState([]);
  // state text search
  const [textSearch, setTextSearch] = useState("");

  const [currPage, setCurrPage] = useState(1);
  const [totalPage] = useState(7);
  const [total, setTotal] = useState(0);

  const loaderUser = async () => {
    let url = "http://localhost:8000/users";

    if (textSearch) {
      url += `?q=${textSearch}`;
    }
    await axios
      .get(`${url}?_page=${currPage}&_limit=${totalPage}`)
      .then((res) => {
        setTotal(res.headers["x-total-count"]);
        setDataUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  let result = Math.ceil(total / totalPage);
  let pagination = [];
  for (let i = 1; i <= result; i++) {
    pagination.push(
      <Pagination.Item
        key={i}
        active={i === currPage}
        onClick={() => setCurrPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  async function handleUnBlock(id) {
    await axios.patch(`http://localhost:8000/users/${id}`, { isBlock: false });
    setReload(!reload);
  }

  async function handleBlock(id) {
    await axios.patch(`http://localhost:8000/users/${id}`, { isBlock: true });
    setReload(!reload);
  }

  // useEffect data
  useEffect(() => {
    loaderUser();
  }, [textSearch, reload, currPage]);

  return (
    <div>
      <h2 className="title">Quản Lý Người Dùng</h2>
      <div className="search">
        <input
          type="text"
          className="search-user"
          placeholder="Search Here..."
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <Table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((user, i) => {
            return (
              <tr
                key={i}
                style={{
                  backgroundColor: user.isBlock ? "#e74a4a" : "",
                  color: user.isBlock ? "#ffffff " : "",
                  transition: "all 0.4s ease",
                }}
              >
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  {user.isBlock ? (
                    <i className="fa-solid fa-lock"></i>
                  ) : (
                    <i className="fa-solid fa-lock-open"></i>
                  )}
                </td>
                <td>
                  {user.isBlock ? (
                    <button
                      onClick={() => handleUnBlock(user.id)}
                      className="btn-user unlock"
                    >
                      UnBlock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(user.id)}
                      className="btn-user lock"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="flex-pagination">
        <Pagination>
          <Pagination.Prev
            disabled={currPage === 1}
            onClick={() => setCurrPage(currPage - 1)}
          />
          {pagination}
          <Pagination.Next
            disabled={result === 1 || totalPage === currPage + 1}
            onClick={() => setCurrPage(currPage + 1)}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default Usermanager;
