import React from "react";
import DisplayText from "../../DisplayText/DisplayText";
import withLabel from "./withLabel";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
const RadioBox = React.memo(
  ({ label, name, value, type, handleChange, width = "100%", data }) => {
    const { t, i18n } = useTranslation();
    return (
      <p
        className="dx-texteditor-input"
        style={{ fontSize: "18px", display: "flex", alignItems: "center" }}
      >
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          className="radio-boxes"
          onChange={(e) => handleChange({ name, value: e.target.value })}
        >
          {data.map((e) => (
            <FormControlLabel
              value={e.Id}
              control={<Radio />}
              label={i18n.language == "en" ? e.NameEn : e.Name}
            />
          ))}
        </RadioGroup>
      </p>
    );
  }
);

export default withLabel(RadioBox);
