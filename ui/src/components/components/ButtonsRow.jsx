import React, { useRef } from "react";
import { Button } from "devextreme-react/button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { LoadIndicator } from "devextreme-react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
// Components

function ButtonRow({
  submitBehavior = true,
  onUndo,
  onSubmit,
  onNew,
  onEdit,
  onCopy,
  onDelete,
  onExit,
  // defineType,
  isSubmit = true,
  isSimilar = true,
  isExit = true,
  isBack = true,
}) {
  let [flag, setFlag] = useState(true);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // console.log("ButtonRow-effect");

    !isBack && setFlag(false);
    return () => {};
  }, []);

  let handleChange = (func, e) => {
    // console.log("ButtonRow-handleChange");
    // if (isBack) {
    //   //setFlag(!flag);
    // }
  };

  let isFunction = (functionToCheck) => {
    var getType = {};
    return (
      (functionToCheck &&
        getType.toString.call(functionToCheck) === "[object Function]") ||
      getType.toString.call(functionToCheck) === "[object AsyncFunction]"
    );
  };
  const editBtn = useRef(null);

  // useKeyboardShortcut(['F1'], () => console.log(123), { overrideSystem: true })
  const divCols = "col margin-content";
  return (
    <div className="row" dir="auto">
      {isSubmit && (
        <div className={divCols}>
          <ButtonComponent
            onClick={onSubmit}
            icon={"fas fa-check px-2"}
            title={"Save"}
            disabled={!flag}
            useSubmitBehavior={submitBehavior}
            shortCut={["Control", "S"]}
            allowShortCut
            style={{ margin: 2 }}
            pressOnEnter
          />
        </div>
      )}
      {/* isBack && (
        <div className={divCols}>
          <ButtonComponent
            onClick={(e) =>
              handleChange(isFunction(onUndo) && onUndo("undo", e))
            }
            icon={"fas fa-undo"}
            title={"Back"}
            disabled={!flag}
            style={{ margin: 2 }}
          />
        </div>
      ) */}
      <div className={divCols}>
        <ButtonComponent
          onClick={(e) => handleChange(isFunction(onNew) && onNew("new", e))}
          icon={"fas fa-plus"}
          title={"New"}
          //  disabled={flag}
          style={{ margin: 2 }}
        />
      </div>
      <div className={divCols}>
        <ButtonComponent
          onClick={(e) => handleChange(isFunction(onEdit) && onEdit("edit", e))}
          icon={"fas fa-pencil-alt"}
          title={"Edit"}
          //   disabled={flag}
          ref={editBtn}
          style={{ margin: 2 }}
        />
      </div>

      {isSimilar && (
        <div className={divCols}>
          <ButtonComponent
            onClick={(e) =>
              handleChange(isFunction(onCopy) && onCopy("copy", e))
            }
            icon={"far fa-copy"}
            title={"Copy"}
            //   disabled={flag}
            ref={editBtn}
            style={{ margin: 2 }}
          />
        </div>
      )}
      <div className={divCols}>
        <ButtonComponent
          onClick={(e) =>
            handleChange(isFunction(onDelete) && onDelete("delete", e))
          }
          icon={"fas fa-trash-alt"}
          title={"Remove"}
          // disabled={flag}
          ref={editBtn}
          style={{ margin: 20 }}
        />
      </div>

      {isExit && (
        <Button
          className="mx-1 buttonStyle"
          stylingMode="outlined"
          rtlEnabled={true}
          style={{ margin: 2 }}
          onClick={(e) => handleChange(isFunction(onExit) && onExit("exit", e))}
          text={t("Exit")}
          icon="fas fa-sign-out-alt"
        />
      )}
    </div>
  );
}

export default React.memo(ButtonRow);
