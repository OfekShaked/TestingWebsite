import React from 'react';
import {Table,TableContainer,Paper, TableHead, TableRow,TableCell,TableBody} from '@mui/material'
import QuestionRow from './QuestionRow';

const QuestionsTable = (props) =>{

    const {rows} = props;
    console.log(rows);
    return(<>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>ID</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Answered Correctly?</TableCell>
                        <TableCell>Date Answered</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(((row, index)=>
                         (<QuestionRow key={index} row={row}/>)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}
export default QuestionsTable;