import notify from "devextreme/ui/notify";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import PageLayout from "../../components/PageLayout/PageLayout";
import { GetUserToken, SetUserData } from "../../services/localStorageService";
import { LOGIN } from "./Api";
import SButtonComponent from "../../components/ButtonComponent/SButtonComponent";

function Login() {
  const navigate = useNavigate();

  const defaultValues = useRef({
    username: "",
    password: "",
  });
  useEffect(() => {
    // if (GetUserToken("user")) navigate("/");
    return () => {};
  }, []);
  const [values, setValues] = useState(defaultValues.current);
  const handleChange = useCallback((e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const [loading, setloading] = useState(false);
  const handleSubmit = (e) => {
    console.log(e);
    console.log(values);
    if (!values.username || !values.password) {
      alert(t("Fill the inputs"));
      return;
    }
    setloading(true);
    LOGIN(values)
      .then((e) => {
        SetUserData(e);
        navigate("/");
        notify(t("saved successfully"), "success", 3000);
      })
      .catch((err) => {
        notify(
          t(err ? err : "Error in information. try again!"),
          "error",
          3000
        );
      })
      .finally(() => setloading(false));
  };
  const { t, i18n } = useTranslation();

  const onHiding = () => setloading(false);
  return (
    <div style={{ margin: "10% auto", maxWidth: "500px" }}>
      <PageLayout title={"Sign In"} loading={loading} onHiding={onHiding}>
        <div className="row">
          <div className="col-lg-12">
            <InputComponent
              label={"Username"}
              handleChange={handleChange}
              name="username"
              type="text"
              value={values["username"]}
              required
            />
            <InputComponent
              label={"Password"}
              handleChange={handleChange}
              name="password"
              type="password"
              value={values["password"]}
              required
              InputButton
            />
          </div>
        </div>
        <div
          style={{
            maxWidth: "300px",
            float: i18n.language === "en" ? "right" : "left",
            marginTop: 20,
          }}
        >
          <ButtonComponent
            onClick={handleSubmit}
            title={"Sign In"}
            onEnter
            onPressEnter={() => handleSubmit(values)}
            pressOnEnter
          />
          <div style={{ marginTop: 10 }}>
            <SButtonComponent
              onClick={() => navigate("/register")}
              title={"Register"}
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

export default Login;
