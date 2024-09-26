import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import "devextreme/dist/css/dx.light.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../components/NavigationBar/routes";
import { GetUserToken } from "../services/localStorageService";
import { data_selector, getData } from "../store/DataReducer";
import Home from "../views/Home/Home";
function User() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const data = async () => {
    const x = await getData();
    dispatch(x);
  };

  const lookups = useSelector(data_selector);
  useEffect(() => {
    if (!GetUserToken("user")) navigate("/login");
    axios.defaults.headers = {
      ...axios.defaults.headers,
      Authorization: `bearer ${GetUserToken("user")}`,
    };
    data();
    return () => {};
  }, []);

  const { t, i18n } = useTranslation();
  const [userPages, setUserPages] = useState([]);
  useEffect(() => {
    lookups?.Roles != null &&
      setUserPages(
        routes.filter((e) => lookups.Roles.find((role) => role === e.key))
      );
  }, [navigate, lookups]);

  return (
    <div
      style={{
        direction: i18n.language === "en" ? "ltr" : "rtl",
      }}
      id="main"
    >
      {lookups == null ? (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <CircularProgress color="inherit" style={{ margin: "auto" }} />
        </div>
      ) : (
        <div style={{ height: "100%", marginTop: "90px" }}>
          <Routes>
            <Route path="" element={<Home />} />
            {userPages.map((e, i) => (
              <Route key={i} path={e.route} element={<e.Component />} />
            ))}
          </Routes>
        </div>
      )}
    </div>
  );
}

export default User;
