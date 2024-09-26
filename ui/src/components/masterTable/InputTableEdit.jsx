import DataGrid, {
  Button,
  Column,
  Editing,
  Export,
  FilterRow,
  GroupItem,
  GroupPanel,
  Grouping,
  HeaderFilter,
  Item,
  LoadPanel,
  Lookup,
  MasterDetail,
  Popup,
  RequiredRule,
  Scrolling,
  Summary,
  Texts,
  Toolbar,
  TotalItem,
} from "devextreme-react/data-grid";
import saveAs from "file-saver";
import React, { useCallback, useRef } from "react";
import ExcelJS from "exceljs";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { exportDataGrid } from "devextreme/excel_exporter";
import "./Table.css";
function InputTableEdit({
  id = "",
  disabled = false,
  selectionMode = "single",
  dataSource,
  summaryData,
  tableGroupSummary,
  colAttributes,
  allowExcel = true,
  width = "100%",
  height = "100%",
  filterRow = true,
  groupPanel = false,
  headerFilter = false,
  canAdd = false,
  canUpdate = false,
  canDelete = true,
  onSelectionChanged,
  onRowRemoving,
  onRowRemoved,
  Uicon = false,
  onRowUpdated,
  deleteMessage = "هل انت متأكد من حذف هذا الاختيار ؟",
  optionChanged = null,
  remoteOperations = false,
  apiMethod,
  allowPrint = true,
  apiPayload,
  onSaving,
  onRowUpdating,
  apiKey,
  onRowDoubleClick,
  mode,
  summaryItems,
  onRowInserting,
  onRowInserted,
  onSaved,
  onEditorPreparingCustom,
  onEditRowKeyChange,
  selectedRowKeys,
  onAddClick,
  MasterRenderDetail,
  excelCols,
}) {
  const { t, i18n } = useTranslation();

  const dataGridRef = React.createRef();
  const onToolbarPreparing = (e) => {
    let toolbarItems = e.toolbarOptions.items;
    // Modifies an existing item
    // toolbarItems.forEach(function (item) {
    // 	if (item.name === "exportButton") {
    // 		item.options = {
    // 			// icon: "exportxlsx",
    // 			text: "إضافة",
    // 			// onClick: function (e) {
    // 			//     // Implement custom save logic here
    // 			// },
    // 		};
    // 	}
    // });

    // Adds a new item
    // toolbarItems.push({
    //   widget: "dxButton",
    //   options: {
    //     icon: "exportpdf",
    //     hint: "طباعة",
    //     onClick: function () {
    //       const doc = new jsPDF();
    //       const dataGrid = dataGridRef.current.instance;
    //       console.log(dataGrid);
    //       exportDataGridToPdf({
    //         jsPDFDocument: doc,
    //         component: dataGrid,
    //       }).then(() => {
    //         doc.save("grid.pdf");
    //       });
    //     },
    //   },
    //   location: "after",
    // });
    // Adds a new item

    if (onAddClick)
      toolbarItems.push({
        widget: "dxButton",
        options: {
          icon: "add",
          hint: "إضافة",
          onClick: onAddClick,
        },
        location: "after",
      });
  };
  function isNumeric(value) {
    return /^\d+$/.test(value);
  }
  const onExportingHandle = (e) => {
    e.cancel = true;

    const csvContent =
      excelCols.map((e) => e.captionEn).join(",") +
      "\n" +
      dataSource
        .map((row) =>
          excelCols
            .map((item, index) =>
              item.data == null
                ? isNumeric(row[item.field])
                  ? row[item.field] + ".0"
                  : row[item.field]
                : item?.data?.length <= 3
                ? " " +
                  item.data
                    .find((e) => e["Id"] == row[item.field])
                    ["NameEn"].toString() +
                  " "
                : " " +
                  item.data
                    .find((e) => e["Id"] == row[item.field])
                    ["NameEn"].toString() +
                  " "
            )
            .join(",")
        )
        .join("\n");

    // Save the file to the client's computer
    const fileName = "data.csv";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, fileName);
  };

  return (
    <div>
      <DataGrid
        disabled={disabled}
        id="gridContainer"
        width={width}
        ref={dataGridRef}
        height={height}
        selection={{ mode: selectionMode }}
        selectedRowKeys={selectedRowKeys}
        showRowLines={true}
        hoverStateEnabled={true}
        dataSource={dataSource}
        showBorders={true}
        onRowDblClick={onRowDoubleClick}
        columnAutoWidth={true}
        allowColumnResizing={true}
        wordWrapEnabled={true}
        onSelectionChanged={onSelectionChanged}
        onRowRemoving={onRowRemoving}
        onRowRemoved={onRowRemoved}
        onRowUpdated={onRowUpdated}
        onRowUpdating={onRowUpdating}
        onSaving={onSaving}
        keyExpr={"Id"}
        onRowInserting={onRowInserting}
        onRowInserted={onRowInserted}
        onEditorPreparing={onEditorPreparingCustom}
        columnHidingEnabled={true}
        onSaved={onSaved}
        onToolbarPreparing={allowPrint && onToolbarPreparing}
        onExporting={onExportingHandle}
        noDataText={t("No data")}
      >
        <FilterRow visible={filterRow} />
        <HeaderFilter visible={headerFilter} />
        <GroupPanel visible={groupPanel} />
        <Grouping contextMenuEnabled={true} expandMode="rowClick" />
        <Scrolling mode="virtual" />

        <Editing
          mode={mode ? "cell" : "popup"}
          useIcons={Uicon}
          allowAdding={canAdd}
          allowDeleting={canDelete}
          allowUpdating={canUpdate}

          //   onEditRowKeyChange={onEditRowKeyChange}
        >
          <Popup title="Form" showTitle={true} fullScreen={true} />
          <Texts deleteRow="حذف" confirmDeleteMessage={deleteMessage} />
        </Editing>
        <LoadPanel enabled={true} />

        {colAttributes.map((attr, index) => {
          return (
            <Column
              format={attr.dateFormat ? "M/d/yyyy" : null}
              key={index}
              cellRender={attr.customizeText}
              type={attr.dataType}
              dataType={attr.dataType}
              allowEditing={attr.allowEditing}
              dataField={attr.field}
              alignment={attr.alignment}
              setCellValue={(rowData, value) => {
                attr.setCellValue && attr.setCellValue(rowData, value);
                rowData[attr.field] = value;
              }}
              caption={
                i18n.language === "ar"
                  ? attr.caption
                  : attr.captionEn ?? attr.caption
              }
              minWidth={attr.widthRatio ? `${attr.widthRatio}px` : "150px"}
            >
              {attr.required ? <RequiredRule /> : null}
              {attr.data ? (
                <Lookup
                  dataSource={attr.data}
                  displayExpr={attr.display}
                  valueExpr={attr.value}
                />
              ) : null}
              {attr.dataType == "buttons"
                ? attr?.buttons?.map((butt, i) => (
                    <Button
                      key={i}
                      text={butt.text}
                      // name={butt.name ? butt.name : null}
                      icon={butt.icon ? butt.icon : null}
                      cssClass={"table-button"}
                      onClick={(e) => butt.onClick(e.row.data)}
                    />
                  ))
                : null}
            </Column>
          );
        })}

        {MasterRenderDetail && (
          <MasterDetail enabled={true} component={MasterRenderDetail} />
        )}

        <Export
          enabled={allowExcel}
          allowExportSelectedData={true}
          // formats={["pdf", "xlsx"]}
          formats={["xlsx"]}
        />
        <Summary recalculateWhileEditing={true}>
          {summaryItems &&
            summaryItems.map((item, index) => {
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
          {tableGroupSummary &&
            tableGroupSummary.map((groupItem, i) => {
              return (
                <GroupItem
                  column={groupItem.column}
                  key={i}
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
    </div>
  );
}

export default React.memo(InputTableEdit);
