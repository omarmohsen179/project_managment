import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { generateRandomString } from "../../components/DateFunction";
import { TextBox } from "../../components/components/Inputs/index";
import { data_selector } from "../../store/DataReducer";
import { GET_ROLES } from "./Api";

const UserForm = ({ handleChange, values, setLoading }) => {
  const { t, i18n } = useTranslation();
  const lookups = useSelector(data_selector);
  const [rolesCheck, setRolesCheck] = useState({});
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    setLoading(true);
    GET_ROLES()
      .then(setRoles)
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    const data = {};
    roles.forEach((element) => {
      data[element] = values.Roles.filter((e) => e == element).length > 0;
      return element;
    });
    setRolesCheck(data);
  }, [values.Id]);
  useEffect(() => {
    const object = [];

    for (const property in rolesCheck) {
      rolesCheck[property] && object.push(property);
    }
    handleChange({
      name: "Roles",
      value: object,
    });
  }, [rolesCheck]);
  const HandleChangeRolesValue = useCallback(({ name, value }) => {
    setRolesCheck((prev) => ({ ...prev, [name]: value }));
  }, []);
  return (
    <>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <TextBox
          label={t("UserName")}
          value={values["Username"]}
          name="Username"
          handleChange={handleChange}
          requiredInput
        />
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <TextBox
          label={t("Password")}
          value={values["Password"]}
          name="Password"
          handleChange={handleChange}
          requiredInput
        />
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: 10 }}>
        <ButtonComponent
          onClick={(e) => {
            handleChange({
              name: "Password",
              value: generateRandomString(8),
            });
          }}
          title={"Generate password"}
        />
      </div>
    </>
  );
};

export default UserForm;
