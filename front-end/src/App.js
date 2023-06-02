import "./App.css";

import { Route, Routes } from "react-router-dom";
import { memo, useState } from "react";

import Friends from "./components/Pages/Homepage/Friends/Friends";
import Homepage from "./components/Pages/Homepage/Homepage";
import Information from "./components/Pages/Information/Information";
import Login from "./components/Pages/Login/Login";
import News from "./components/Pages/Homepage/News/News";
import Notfound from "./components/Pages/Notfound/Notfound";
import Register from "./components/Pages/Register/Register";

function App() {
  const [theme, setTheme] = useState(false);

  function changeMode() {
    setTheme(!theme);
  }

  return (
    <div
      className="App"
      style={{
        transition: "all 0.3s ease",
      }}
    >
      <Routes>
        {/* pr */}
        {localStorage.getItem("checkLogin") ? (
          <Route path="/" element={<Homepage changeMode={changeMode} />}>
            {/* Trang chủ */}
            <Route index element={<News />}></Route>
            <Route path="/friends" element={<Friends />}></Route>
          </Route>
        ) : (
          <Route path="/" element={<Login />}></Route>
        )}
        <Route
          path="/information/:id"
          element={<Information theme={theme} changeMode={changeMode} />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* not found */}
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
}

export default memo(App);
