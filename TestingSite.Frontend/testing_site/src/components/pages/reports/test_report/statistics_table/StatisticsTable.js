import React from 'react';
import {Table,TableContainer,Paper, TableHead, TableRow,TableCell,TableBody} from '@mui/material'
import StatisticsRow from './QuestionStatisticsRow';

const StatisticsTable = (props) =>{

    const {rows} = props;
    return(<>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>ID</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Number Of Submissions</TableCell>
                        <TableCell>% Answered Correctly</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(((row, index)=>
                         (<StatisticsRow key={index} row={row}/>)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}
export default StatisticsTable;