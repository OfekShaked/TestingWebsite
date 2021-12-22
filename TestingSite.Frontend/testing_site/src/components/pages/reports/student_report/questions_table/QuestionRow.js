import { TableRow,TableCell,IconButton,Collapse, Stack,Typography } from "@mui/material";
import React, { useState } from "react";
import {KeyboardArrowUp,KeyboardArrowDown} from '@mui/icons-material';
import Answer from './Answer';
import { Check,Clear} from '@mui/icons-material';
import DateProvider from "../../../../common/date_provider/DateProvider"


const QuestionRow = (props) => {
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
        <TableCell align="right">{JSON.parse(row.name).blocks[0].text}</TableCell>
        <TableCell align="right">{row.is_correct?<Check/>:<Clear/>}</TableCell>
        <TableCell align="right"><DateProvider date={row.last_modified}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <Stack spacing={2}>
                <Typography variant="h6">Answers: </Typography>
              {row.answers.map((ans)=>(
                  <Answer key={ans.id} answer={ans}/>
              ))}
              </Stack>
          </Collapse>
          </TableCell>
        </TableRow>
    </>
  );
};
export default QuestionRow;
