import React from "react";
import withLabel from "./withLabel";
import { Validator, RequiredRule } from "devextreme-react/validator";
import { TextBox, Button as TextBoxButton } from "devextreme-react/text-box";
import { useTranslation } from "react-i18next";

const Input = React.memo(
  ({
    label,
    placeholder,
    name,
    value,
    handleChange,
    required = false,
    requiredInput = true,
    readOnly = false,
    validationErrorMessage,
    enterKeyHandle,
    cssClass,
    size,
    disabled,
    buttonOptions,
  }) => {
    const { t, i18n } = useTranslation();
    return (
      <TextBox
        validationMessageMode="auto"
        validationStatus={validationErrorMessage ? "invalid" : "valid"}
        validationError={{ message: validationErrorMessage }}
        readOnly={readOnly}
        placeholder={placeholder ?? label}
        // rtlEnabled={true}
        value={value || ""}
        disabled={disabled}
        name={name}
        // onInput={({ event }) => handleChange(event.target)}
        onInput={({ event }) =>
          handleChange({ name, value: event.target.value })
        }
        onEnterKey={({ event }) =>
          enterKeyHandle && enterKeyHandle(event.target)
        }
        className={cssClass}
        // enterKeyAction={(e) => console.log(e)}
      >
        {buttonOptions && (
          <TextBoxButton
            name={name}
            location="before"
            options={buttonOptions}
          />
        )}
        {required && (
          <Validator>
            <RequiredRule message={t("This Input is Required")} />
          </Validator>
        )}
      </TextBox>
    );
  }
);

export default React.memo(withLabel(Input));
