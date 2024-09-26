import React, { useEffect, useRef } from "react";
import "./ButtonComponent.css";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import { Button } from "devextreme-react";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { createRef } from "react";
import useEnterKeyListener from "./useEnterKeyListener";

const ButtonComponent = ({
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
  const refBtn = useRef();

  // const { flushHeldKeys } = useKeyboardShortcut(shortCut, (click) => {}, {
  //   overrideSystem: true,
  //   ignoreInputFields: allowShortCut,
  // });

  useEnterKeyListener({
    querySelectorToExecuteClick: "submitButton",
    enable: pressOnEnter,
  });
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
      ref={refBtn}
      id={pressOnEnter && "submitButton"}
    />
  );
};

export default React.memo(ButtonComponent);
