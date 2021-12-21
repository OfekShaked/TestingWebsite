import {  Paper, Typography, Stack } from "@mui/material";
import React from "react";
import './AnswerStatisticsRow.css'

const AnswerStatisticsRow = (props) => {
  const { row, num_of_submissions } = props;

  return (
    <>
      <Paper className="center-items">
        <Stack spacing={2} direction="row" className="center-items">
          <Typography>Answer: {JSON.parse(row.answer.text).blocks[0].text}</Typography>
          <Typography>
            Percentage chosen: {Math.round(100 * row.num_chosen / num_of_submissions)}%
          </Typography>
        </Stack>
      </Paper>
    </>
  );
};
export default AnswerStatisticsRow;
