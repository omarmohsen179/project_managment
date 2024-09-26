import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MasterTable from "../masterTable/MasterTable";
function CrudMUI({
  colAttributes,
  EDIT,
  ADD,
  DELETE,
  GET = async () => {},
  view = false,
  summaries = [],
  onSelectionChanged = () => {},
  editMode = "row",
  onToolbarPreparing,
  apiPayload = {},
  onEditorPreparing,
}) {
  const { t, i18n } = useTranslation();
  const [cols, setCols] = useState([]);
  useEffect(() => {
    setCols(applyColumns());
  }, [colAttributes, i18n.language]);
  const applyColumns = () => {
    const res = [];
    res.push(...colAttributes);
    return res;
  };
  const summary = [
    {
      column: "Id",
      summaryType: "count",
      valueFormat: "currency",
      cssClass: "summaryNetSum",
      showInColumn: "Id",
      customizeText: (data) => {
        return `${t("Count")}: ${data.value} `;
      },
    },
  ];

  const [page, setPage] = useState();
  useEffect(() => {
    // setPage(getPageInfo().key.replace("View", ""));
  }, []);
  // const { lookups } = useAuth();
  return (
    <>
      <MasterTable
        apiMethod={GET}
        apiPayload={apiPayload}
        apiKey={"Id"}
        remoteOperations={true}
        colAttributes={cols}
        allowAdd={
          !view
          //  && lookups.Roles.includes(page + "Add")
        }
        allowUpdate={
          !view
          // && lookups.Roles.includes(page + "Update")
        }
        allowDelete={
          !view
          // && lookups.Roles.includes(page + "Delete")
        }
        insertApiMethod={ADD}
        updateApiMethod={EDIT}
        removeApiMethod={DELETE}
        summaryItems={summary}
        onSelectionChanged={onSelectionChanged}
        editMode={editMode}
        onToolbarPreparing={onToolbarPreparing}
        onEditorPreparing={onEditorPreparing}
      />
    </>
  );
}

export default React.memo(CrudMUI);
