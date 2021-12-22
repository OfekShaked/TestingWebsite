import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import "./CommonTable.css";

const CommonTable = (props) => {
  return (
    <Paper className="table-background">
      <DataGrid
        className={"table-height"}
        rows={props.rows}
        columns={props.columns}
        onCellClick={props.onCellClick}
        checkboxSelection={props.checkboxSelection}
        selectionModel={props.selectionModel}
        onSelectionModelChange={props.onSelectionModelChange}
        pageSize={5}
        rowsPerPageOptions={[5]}
      ></DataGrid>
    </Paper>
  );
};
export default CommonTable;
