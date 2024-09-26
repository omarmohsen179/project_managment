import React, { useEffect, useRef } from "react";
import "./ButtonComponent.css";
import { useTranslation } from "react-i18next";
import { Button } from "devextreme-react";

const SButtonComponent = ({
  title,
  onClick,
  icon,
  disabled = false,
  useSubmitBehavior = false,
  shortCut = ["Enter"],
  allowShortCut = false,
  hint,
  pressOnEnter = false,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      className="mx-1 buttonStyle"
      stylingMode="outlined"
      width={"100%"}
      text={" " + t(title) + " "}
      style={{ margin: "5px 5px" }}
      type="default"
      useSubmitBehavior={useSubmitBehavior}
      icon={icon}
      //  rtlEnabled={i18n.language !== "en"}
      onClick={onClick}
      disabled={disabled}
      hint={hint}
      id={pressOnEnter && "submitButton"}
    />
  );
};

export default React.memo(SButtonComponent);
