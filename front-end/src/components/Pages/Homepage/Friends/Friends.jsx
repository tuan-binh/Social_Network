import "./Friends.scss";

import React, { memo, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import axios from "axios";

function Friends() {
  console.log("re-render-people");
  const [dataEvent, setDataEvent] = useState([]);

  const loader = async () => {
    await axios
      .get("http://localhost:8000/events")
      .then((res) => setDataEvent(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loader();
  }, []);

  return (
    <div className="box-friends">
      <h1>Sự kiện vui chơi cùng bạn bè</h1>
      <div className="list-friends">
        <div className="row">
          {dataEvent.map((e, i) => {
            return (
              <div key={i} className="event">
                <img src={e} alt="" />
                <Button className="join" variant="primary">
                  Mời bạn bè
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(Friends);
