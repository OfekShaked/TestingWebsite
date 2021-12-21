import { TableRow,TableCell,IconButton,Collapse, Paper,Table,TableContainer,TableBody } from "@mui/material";
import React, { useState } from "react";
import {KeyboardArrowUp,KeyboardArrowDown} from '@mui/icons-material';
import AnswerStatisticsRow from "./AnswerStatisticsRow";


const QuestionStatisticsRow = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{JSON.parse(row.question.text).blocks[0].text}</TableCell>
        <TableCell align="right">{row.num_of_submissions}</TableCell>
        <TableCell align="right">{row.answer_correct_percent}%</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableBody>
                        {row.answer_statistics.map((answer,index)=>{
                          return <AnswerStatisticsRow key={index} row={answer} num_of_submissions={row.num_of_submissions}/>
                        })}
                    </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </TableCell>
        </TableRow>
    </>
  );
};
export default QuestionStatisticsRow;
