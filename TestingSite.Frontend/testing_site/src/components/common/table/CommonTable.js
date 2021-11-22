import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import './CommonTable.css'

const CommonTable = (props) => {
  return (
    <Paper className="table-background">
      <DataGrid rows={props.rows} columns={props.columns} onCellClick={props.onCellClick}></DataGrid>
    </Paper>
  );
};
export default CommonTable;
