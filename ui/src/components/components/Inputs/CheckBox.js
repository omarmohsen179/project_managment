import React from "react";

import { CheckBox } from "devextreme-react/check-box";
import withLabel from "./withLabel";
import { memo } from "react";

const Input = ({
  label,
  value = false,
  name,
  handleChange,
  readOnly = false,
}) => {
  return (
    <CheckBox
      value={value}
      style={{ direction: "ltr" }}
      onValueChanged={({ value }) => handleChange({ name, value })}
      readOnly={readOnly}
      defaultValue={value}
    />
  );
};

export default withLabel(Input);
