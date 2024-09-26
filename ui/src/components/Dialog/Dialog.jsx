import React from "react";
import Popup from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { useTranslation } from "react-i18next";
import { LoadIndicator } from "devextreme-react/load-indicator";
import { CircularProgress } from "@mui/material";
function Dialog({
  children,
  title,
  visible,
  width = 500,
  height = 500,
  close,
  loading = false,
}) {
  const { i18n, t } = useTranslation();

  return (
    <Popup
      width={width}
      height={height}
      visible={visible}
      onHiding={close}
      showTitle={true}
      title={t(title)}
      hideOnOutsideClick={true}
      rtlEnabled={i18n.language !== "en"}
    >
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <CircularProgress color="inherit" style={{ margin: "auto" }} />
        </div>
      ) : (
        <ScrollView>
          <div
            style={{
              direction: i18n.language == "en" ? "ltr" : "rtl",
              textAlign: i18n.language == "en" ? "left" : "right",
            }}
          >
            {children}
          </div>
        </ScrollView>
      )}
    </Popup>
  );
}
export default Dialog;
