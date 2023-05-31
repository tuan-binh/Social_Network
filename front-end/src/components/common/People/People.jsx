import "./People.scss";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function People() {
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState([]);

  const [getUser, setGetUser] = useState(
    JSON.parse(localStorage.getItem("dataUserLogin"))
  );

  const loaderUser = async () => {
    await axios
      .get("http://localhost:8000/users")
      .then((res) =>
        setDataUser(
          res.data.filter((user) => user.username !== getUser.username)
        )
      )
      .catch((err) => console.log(err));
  };

  function handleToUser(id) {
    navigate(`/information/${id}`);
  }

  useEffect(() => {
    loaderUser();
    // user();
  }, []);

  return (
    <div className="list-friend">
      <ul className="listPeople">
        {/* ads */}
        <li className="ads">
          <div>
            <img
              src="https://cdn.hoanghamobile.com/i/preview/Uploads/2022/09/08/1111.png"
              alt=""
            />
          </div>
          <p>Iphone 14 giảm giá sốc còn 15.000.000 đ</p>
        </li>
        <li className="ads">
          <div>
            <img
              src="https://cdn.hoanghamobile.com/i/preview/Uploads/2022/09/08/1111.png"
              alt=""
            />
          </div>
          <p>Iphone 14 giảm giá sốc còn 15.000.000 đ</p>
        </li>
        {/* people */}
        {dataUser.map((e, i) => {
          return (
            <li key={i} onClick={() => handleToUser(e.id)}>
              <div>
                <img src={e.urlAvatar} alt="" />
              </div>
              <p style={{ margin: "0" }}>{e.username}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default People;
