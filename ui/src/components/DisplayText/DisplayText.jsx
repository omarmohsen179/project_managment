import { memo } from "react";
import { useTranslation } from "react-i18next";
import { DateConvertor, DisplayNumber } from "../DateFunction";

const DisplayText = ({ value, type }) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      {type == "number" && DisplayNumber(value, i18n)}
      {type == "date" && DateConvertor(value, i18n)}
    </div>
  );
};

export default memo(DisplayText);
