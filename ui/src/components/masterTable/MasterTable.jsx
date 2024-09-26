import {
  Button,
  Column,
  ColumnChooser,
  DataGrid,
  Editing,
  Export,
  FilterRow,
  Form,
  GroupItem,
  GroupPanel,
  HeaderFilter,
  Lookup,
  MasterDetail,
  Paging,
  Popup,
  RequiredRule,
  Scrolling,
  SearchPanel,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import { exportDataGrid } from "devextreme/excel_exporter";
import notify from "devextreme/ui/notify";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import "jspdf-autotable";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const dataGridRef = React.createRef();

function MasterTable({
  id = "",
  disabled = false,
  //* "single" "multiple"
  selectionMode = "single",
  //* [{ }, ...]
  dataSource = [],
  //* colAttributes = [{ field : "Target attribute in our object",
  //*                    caption : "Text will appear in column header",
  //*                    isVisable : true or false
  //*                    dataType? : "string" as defualt "number" "data" "dataTime" "boolean" "object",
  //*                    alignment? : "right" as defualt "left" "center"
  //*                    format?: "currency"
  //*                    widthRatio? : "150px" as defualt
  //*                  }, ... ]
  colAttributes = [],
  width = "100%",
  height = "70vh",
  filterRow = false,
  groupPanel = false,
  headerFilter = false,
  allowAdd = false,
  allowUpdate = false,
  allowDelete = false,
  allowPrint = false,
  allowExcel = false,
  allowPaging = false,
  columnChooser = true,
  HeaderComponent,
  pageSize = 5,
  onSelectionChanged,
  onRowRemoving,
  onRowRemoved,
  onRowUpdating,
  onRowDoubleClick,
  onRowInserting,
  onSaving,
  RowDetails,
  /*
   *   summaryItems = [{column:"id",
   *                    summaryType:"sum",
   *                    valueFormat:"currency",
   *                    cssClass:"summaryNetSum",
   *                    showInColumn:"id"
   *                    customizeText:customizeTextHandler}
   *                  ]
   * */
  summaryItems = [],
  tableGroupSummary = [],
  onToolbarPreparing,
  deleteMessage = "Are you sure to delete this element?",
  remoteOperations = false,
  remote = false,
  apiMethod,
  removeApiMethod,
  insertApiMethod,
  updateApiMethod,
  removeApiPayload = {},
  otherMethod,
  apiPayload,
  apiKey,
  allowSelectAllMode = true,
  onFilterValuesChange,
  editMode = "row",
  searchPanel = true,
  onEditorPreparing,
}) {
  const { t, i18n } = useTranslation();
  const retrieved = useRef([]);
  function isValidDate(dateString) {
    return !isNaN(Date.parse(dateString));
  }
  const refreshDataGrid = useCallback(() => {
    dataGridRef.current.instance.refresh();
  }, []);
  // Store of API data
  const store = useMemo(
    () =>
      new CustomStore({
        // Key of this object
        key: apiKey,
        // OnLoad Event
        // (skip, take) => {return {data, totalCount}}
        load: function (props) {
          const { skip = 0, take = 20, filter, userData } = props;
          // Create a filter sql statementbuttons

          const filterO = {};
          if (filter) {
            var res = [];
            if (typeof filter[0] === "string") {
              res[0] = filter;
            } else {
              res = filter;
            }
            function loop(res = []) {
              res.forEach((e) => {
                if (e.length > 1 && Array.isArray(e)) {
                  if (Array.isArray(e[0])) {
                    loop(e);
                  } else if (isValidDate(e[2]) && e[1] == ">=") {
                    filterO["From"] = e[2];
                  } else if (isValidDate(e[2]) instanceof Date && e[1] == "<") {
                    filterO["To"] = e[2];
                  } else {
                    //   if (res.includes("or") && typeof e[2] === "string") {
                    //     filterO["Search"] = e[2];
                    //   }
                    //   //  if (typeof e[2] === "object")
                    //   else {
                    //     filterO[e[0]] = e[2];
                    //   }
                    filterO[res.includes("or") ? "Search" : e[0]] = e[2];
                  }
                }
              });
            }
            loop(res);
          }
          console.log("load data");
          // API method
          return apiMethod({
            ...apiPayload,
            ...filterO,
            PageIndex: skip / take,
            PageSize: take,
          }).then((data) => {
            retrieved.current = data.Data;
            return {
              data: data.Data,
              totalCount: data.TotalCount ? data.TotalCount : 0,
              summary: [data.TotalCount],
            };
          });
        },

        remove: async (key) => {
          if (key) {
            try {
              await removeApiMethod(key);
            } catch (err) {
              notify(
                t(
                  err.Message ? err.Message : "Error in information. try again!"
                ),
                "error",
                3000
              );
              throw err;
            }
          }
        },
        insert: async (obj) => {
          try {
            await insertApiMethod({ [apiKey]: 0, ...obj });
          } catch (err) {
            notify(
              t(err.Message ? err.Message : "Error in information. try again!"),
              "error",
              3000
            );
            throw err;
          }
        },
        update: async function (key, values) {
          try {
            await updateApiMethod({
              [apiKey]: key,
              ...retrieved.current.find((e) => e[apiKey] == key),
              ...values,
            });
          } catch (err) {
            notify(
              t(err.Message ? err.Message : "Error in information. try again!"),
              "error",
              3000
            );
            throw err;
          }
        },
      }),
    [
      apiKey,
      apiMethod,
      apiPayload,
      filterRow,
      otherMethod,
      removeApiMethod,
      removeApiPayload,
      updateApiMethod,
      insertApiMethod,
      retrieved,
    ]
  );
  const data = remoteOperations ? store : dataSource;
  const [showFilterRow, setShowFilterRow] = useState(false);
  return (
    <React.Fragment>
      <DataGrid
        dataSource={data}
        disabled={disabled}
        id={id}
        ref={dataGridRef}
        width={width}
        height={height}
        showRowLines={true}
        hoverStateEnabled={true}
        rtlEnabled={i18n.language === "ar"}
        showBorders={true}
        onEditorPreparing={onEditorPreparing}
        columnAutoWidth={true}
        allowColumnResizing={true}
        wordWrapEnabled={true}
        selection={{
          mode: selectionMode,
          allowSelectAll: allowSelectAllMode,
        }}
        onSelectionChanged={onSelectionChanged}
        onRowRemoving={onRowRemoving}
        onRowUpdating={onRowUpdating}
        onRowInserting={onRowInserting}
        onToolbarPreparing={(e) => {
          let toolbarItems = e.toolbarOptions.items;

          toolbarItems.unshift({
            // Use unshift to add it before other items
            widget: "dxCheckBox",
            location: "before",
            options: {
              value: showFilterRow,
              onValueChanged: () => setShowFilterRow(!showFilterRow),
              text: t("Filter Row"), // Replace with t("Filter Row") if using i18n
            },
          });

          // Refresh button
          toolbarItems.unshift({
            // Adding at the beginning to appear on the left
            widget: "dxButton",
            options: { icon: "refresh", onClick: refreshDataGrid },
            location: "after",
          });
          onToolbarPreparing && onToolbarPreparing(toolbarItems);
        }}
        onExporting={onExportingHandle}
        onRowDblClick={onRowDoubleClick}
        onSaving={onSaving}
        remoteOperations={
          remoteOperations
            ? {
                filtering: remoteOperations,
                summary: remoteOperations,
                paging: true,
              }
            : false
        }
        sorting={!remoteOperations}
      >
        <SearchPanel
          visible={searchPanel}
          width={240}
          placeholder={t("Search...")}
        />
        <ColumnChooser enabled={columnChooser} />
        <FilterRow visible={showFilterRow} />
        <HeaderFilter visible={headerFilter} />
        <GroupPanel visible={groupPanel} />
        <Editing
          mode={editMode}
          useIcons={true}
          allowAdding={allowAdd}
          allowDeleting={allowDelete}
          allowUpdating={allowUpdate}
        >
          {" "}
          <Popup title="Items" showTitle={true} width={700} height={525} />
          <Form>
            <Item itemType="group" colCount={2} colSpan={2}>
              {colAttributes?.length > 0 &&
                colAttributes.map((col, index) => (
                  <Item dataField={col.field} />
                ))}
            </Item>
          </Form>
          {/* <Texts
            exportAll={t("export all")}
            exportSelectedRows={t("export selected")}
            exportTo={t("export to")}
            addRow={t("add new")}
            editRow={t("Update")}
            saveRowChanges={t("Save")}
            cancelRowChanges={t("Cancel")}
            deleteRow={t("Remove")}
            confirmDeleteMessage={t(deleteMessage)}
          /> */}
        </Editing>
        <Scrolling mode="virtual" rowRenderingMode="virtual" />
        <Paging enabled={true} defaultPageSize={20} />

        {colAttributes?.length > 0 &&
          colAttributes.map((col, index) => {
            return (
              <Column
                key={index}
                name={col.field}
                dataType={col.type}
                type={col.type}
                visible={col.isVisable}
                dataField={col.field}
                allowEditing={!col.disable}
                caption={
                  i18n.language === "en"
                    ? col.captionEn ?? col.caption
                    : col.caption
                }
                format={col.type == "date" ? "yyyy/MM/dd HH:mm:ss" : null}
                alignment={
                  col.alignment || (i18n.language === "ar" ? "right" : "left")
                }
                cssClass={col.cssClass}
                grouped={col.grouped}
                groupIndex={col.groupIndex}
                autoExpandGroup={false}
                onFilterValuesChange={onFilterValuesChange}
                allowFiltering={col.HideFilter ? false : true}
                calculateCellValue={col.calculateCellValueHandle}
                width={col.widthRatio ? `${col.widthRatio}px` : null}
                setCellValue={col.setCellValue}
              >
                {col.data ? (
                  <Lookup
                    dataSource={col.data}
                    displayExpr={
                      i18n.language === "en"
                        ? col.displayEn ?? col.display
                        : col.display
                    }
                    valueExpr={col.value ? col.value : "id"}
                  />
                ) : null}
                {col.type == "buttons" ? (
                  <Button
                    text={col.text}
                    icon={col.icon ? col.icon : null}
                    onClick={(e) => {
                      col.func(e.row.data);
                    }}
                  />
                ) : null}
                {col.required ? <RequiredRule /> : null}
              </Column>
            );
          })}
        <MasterDetail enabled={RowDetails != null} component={RowDetails} />
        {(allowDelete || allowUpdate) && (
          <Column type="buttons" width={70}>
            <Button name="edit" />
            <Button name="delete" />
          </Column>
        )}
        <Export enabled={allowExcel} allowExportSelectedData={true} />

        <Summary>
          {summaryItems.map((item, index) => {
            return (
              <TotalItem
                key={index}
                column={item.column}
                summaryType={item.summaryType}
                valueFormat={item.valueFormat}
                showInColumn={item.showInColumn}
                cssClass={item.cssClass}
                skipEmptyValues={true}
                customizeText={item.customizeText}
              />
            );
          })}
          {tableGroupSummary.map((groupItem) => {
            return (
              <GroupItem
                column={groupItem.column}
                summaryType={groupItem.summaryType}
                showInGroupFooter={groupItem.showInGroupFooter}
                displayFormat={groupItem.displayFormat}
                alignByColumn={groupItem.alignByColumn}
                showInColumn={groupItem.showInColumn}
              />
            );
          })}
        </Summary>
      </DataGrid>
    </React.Fragment>
  );
}

const onExportingHandle = (e) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Main sheet");

  exportDataGrid({
    component: e.component,
    worksheet: worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "DataGrid.xlsx"
      );
    });
  });
  e.cancel = true;
};

export default React.memo(MasterTable);
