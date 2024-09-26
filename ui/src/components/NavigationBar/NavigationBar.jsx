import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { RemoveUserData } from "../../services/localStorageService";
import { data_selector } from "../../store/DataReducer";
import "./NavigationBar.css";
import { routes } from "./routes";
function NavigationBar() {
  const navigate = useNavigate();
  const lookups = useSelector(data_selector);
  const [currentRoute, setCurrentRoute] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  const { t, i18n } = useTranslation();
  const toggle = () => {
    lookups?.Roles != null &&
      setUserPages(
        routes.filter((e) => lookups.Roles.find((role) => role === e.key))
      );
    if (document.getElementById("touch")?.classList.contains("collapsed")) {
      openNav();
    } else {
      closeNav();
    }
  };
  const [userPages, setUserPages] = useState([]);
  useEffect(() => {
    lookups?.Roles != null &&
      setUserPages(
        routes.filter((e) => lookups.Roles.find((role) => role === e.key))
      );
  }, []);
  function openNav() {
    setOpen(true);
    document.getElementById("mySidenav").style.width = "250px";
    i18n.language === "en"
      ? (document.getElementById("main").style.marginLeft = "250px")
      : (document.getElementById("main").style.marginRight = "250px");
    document.getElementById("touch").classList.remove("collapsed");
  }

  function closeNav() {
    setOpen(false);
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.margin = "0";
    document.getElementById("touch")?.classList.add("collapsed");
  }

  return (
    <nav className={"   NavbarDraw "} id="mynav">
      <div
        className="container"
        style={{ direction: i18n.language === "en" ? "rtl" : "ltr" }}
      >
        <div className="mainclass ">
          <div style={{ margin: "auto 0" }}>
            <div className="Logo-size" style={{ cursor: "pointer" }}>
              <img
                onClick={() => navigate.push("/")}
                src={logo}
                width={"100%"}
                height={"100%"}
                alt="dd"
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              onClick={() => {
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
                closeNav();
              }}
              className=" log-out-icon"
            >
              {t("lang")}
            </div>

            {window.location.hash !== "#/login" && (
              <input
                style={{ display: "none" }}
                id="check02"
                type="checkbox"
                name="menu"
              />
            )}
            {!open && window.location.hash !== "#/login" && (
              <div className="collabse-button" onClick={toggle}>
                <button
                  className="navbar-toggler collapsed"
                  type="button"
                  id="touch"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon top-bar"></span>
                  <span className="toggler-icon middle-bar"></span>
                  <span className="toggler-icon bottom-bar"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div
          id="mySidenav"
          className="sidenav"
          style={i18n.language === "en" ? { left: 0 } : { right: 0 }}
        >
          <i
            className="closebtn"
            style={{ cursor: "pointer", color: "white" }}
            onClick={closeNav}
          >
            &times;
          </i>

          <h2 style={{ color: "white", textAlign: "center", fontSize: 24 }}>
            <i className="fas fa-user" style={{ fontSize: 40 }}></i>
            <br />
            {lookups?.Username}
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              direction: i18n.language === "en" ? "ltr" : "rtl",
              textAlign: "initial",
            }}
          >
            {lookups?.Roles &&
              userPages.map((ele, i) => (
                <li key={i}>
                  <Link
                    className={currentRoute === ele.route ? "active-page" : ""}
                    style={{ fontSize: 18 }}
                    to={ele.route}
                  >
                    {t(ele.name)}
                  </Link>{" "}
                </li>
              ))}
            <li
              onClick={() => {
                closeNav();
                RemoveUserData();
                navigate("/login");
              }}
              style={{ minWidth: "250px" }}
            >
              <Link
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "red",
                  fontSize: 18,
                }}
              >
                {t(" Log Out ")}
                <i className="fa-solid fa-right-from-bracket"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
