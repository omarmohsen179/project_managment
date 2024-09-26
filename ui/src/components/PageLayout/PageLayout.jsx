import { Card, CardBody, CardHeader } from "reactstrap";

import "devextreme/dist/css/dx.light.css";
import { useTranslation } from "react-i18next";

import "devextreme/dist/css/dx.light.css";
import { useDispatch } from "react-redux";
import { getData } from "../../store/DataReducer";
import LoadingPanel from "../LoadingPanel";
import { memo } from "react";
const PageLayout = ({ children, loading = false, onHiding, title, submit }) => {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();
  const data = async () => {
    const x = await getData();
    dispatch(x);
  };
  return (
    <div>
      <Card style={{ marginBottom: "20px" }} className="container card-user">
        <CardHeader
          style={{
            backgroundColor: "white",
            //  textAlign: i18n.language === "en" ? "left" : "right",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2>{t(title)} </h2>
            </div>
            <div style={{ cursor: "pointer" }} onClick={data}>
              <i className="fa-sharp fa-solid fa-rotate"></i>
            </div>
          </div>
        </CardHeader>

        <CardBody
          style={{
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <LoadingPanel loading={loading} onHiding={onHiding} />
          <form onSubmit={submit}>{children}</form>
        </CardBody>
      </Card>
    </div>
  );
};

export default memo(PageLayout);
