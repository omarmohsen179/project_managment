import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import User from "./layout/user";
import { GetUserToken } from "./services/localStorageService";
import Login from "./views/Login/Login";
import Register from "./views/Registration/Registration";
function App() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!GetUserToken("user")) navigate("/login");
    axios.defaults.headers = {
      ...axios.defaults.headers,
      Authorization: `bearer ${GetUserToken("user")}`,
    };
    return () => {};
  }, []);

  const { t, i18n } = useTranslation();

  return (
    <div
      style={
        {
          //   direction: i18n.language === "en" ? "ltr" : "rtl",
        }
      }
      lang={i18n.language === "en" ? "en" : "ar"}
    >
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
