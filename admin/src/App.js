import "./App.css";

import { Route, Routes } from "react-router-dom";

import Admin from "./components/admin/Admin";
import LoginAdmin from "./components/LoginAdmin/LoginAdmin";
import Postmanager from "./components/admin/Postmanager/Postmanager";
import Usermanager from "./components/admin/Usermanager/Usermanager";

function App() {
  return (
    <div>
      <Routes>
        {localStorage.getItem("checkAdmin") ? (
          <Route path="/" element={<Admin />}>
            <Route index element={<Postmanager />}></Route>
            <Route path="/usermanager" element={<Usermanager />}></Route>
          </Route>
        ) : (
          <Route path="/" element={<LoginAdmin />}></Route>
        )}

        <Route path="/login" element={<LoginAdmin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
