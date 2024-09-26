import notify from "devextreme/ui/notify";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import PageLayout from "../../components/PageLayout/PageLayout";
import { GetUserToken, SetUserData } from "../../services/localStorageService";
import { REGISTRATION } from "./Api";
import { SelectBox } from "../../components/components/Inputs";

function Register() {
  const navigate = useNavigate();

  const defaultValues = useRef({
    username: "",
    password: "",
    confirmPassword: "",
    Role: "",
  });
  useEffect(() => {
    if (GetUserToken("user")) navigate("/");
    return () => {};
  }, []);
  const [values, setValues] = useState(defaultValues.current);
  const handleChange = useCallback((e) => {
    console.log(e.target);
    if (e.target) {
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setValues((prev) => ({ ...prev, [e.name]: e.value }));
    }
  }, []);
  const [loading, setloading] = useState(false);
  const handleSubmit = (e) => {
    console.log(e);
    console.log(values);
    if (!values.username || !values.password) {
      alert(t("Fill the inputs"));
      return;
    }
    if (values.confirmPassword != values.password) {
      alert(t("password doesn't match"));
      return;
    }
    setloading(true);
    REGISTRATION({ ...values, Roles: [values.Role] })
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
      <PageLayout title={"Register"} loading={loading} onHiding={onHiding}>
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
            <InputComponent
              label={"Confirm Password"}
              handleChange={handleChange}
              name="confirmPassword"
              type="confirmPassword"
              value={values["confirmPassword"]}
              required
              InputButton
            />
            <SelectBox
              label={t("Role")}
              dataSource={[{ Name: "Manager" }, { Name: "Employee" }]}
              keys={{ id: "Name", name: "Name" }}
              value={values.Role}
              name="Role"
              requiredInput
              handleChange={handleChange}
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
            title={"Register"}
            onEnter
            onPressEnter={() => handleSubmit(values)}
            pressOnEnter
          />
          <div style={{ marginTop: 10 }}>
            <ButtonComponent
              onClick={() => navigate("/login")}
              title={"Sign In"}
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

export default Register;
