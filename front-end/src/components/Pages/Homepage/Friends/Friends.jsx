import "./Friends.scss";

import React, { memo, useEffect, useState } from "react";

import Toastify from "toastify-js";
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

  function handleSuccess() {
    Toastify({
      text: "Mời bạn bè thành công",
      position: "center",
      duration: 3000,
      style: {
        background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
      },
    }).showToast();
  }

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
                {/* <Button className="join" variant="primary">
                  Mời bạn bè
                </Button> */}
                <button onClick={handleSuccess}>
                  <span class="button_top">Mời Bạn Bè</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(Friends);
