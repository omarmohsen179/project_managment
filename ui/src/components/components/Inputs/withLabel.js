import React from "react";
import { useTranslation } from "react-i18next";

let withLabel = (WrappedComponent) => {
  const withLabel = (props) => {
    let {
      label,
      size,
      requiredInput = false,
      width = "100%",
      labelWidth = "120px",
    } = props;
    return (
      <div
        className={"input-wrapper " + size}
        style={{ gridTemplateColumns: labelWidth + " 1fr" }}
      >
        {label && (
          <div className="label" style={{ width: width }}>
            {label}
            {requiredInput && <b style={{ color: "red" }}>*</b>}
          </div>
        )}
        <WrappedComponent {...props} />
      </div>
    );
  };
  return withLabel;
};
export default withLabel;
