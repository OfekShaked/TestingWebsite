import React from 'react';
import {Paper} from '@mui/material';
import CommonTable from '../../../common/table/CommonTable'
import QuestionTextOverFlow from "./column_renders/question_text_and_tag/QuestionTextOverFlow";
import ActionButton from './column_renders/action_button/ActionButton';


const ModifyQuestions =  () =>{

    
    return (
        <Paper>
            <CommonTable columns={columns}/>
        </Paper>
    );
}

const columns = [
    {field: '_id', headerName:'ID'},
    {field: 'text', headerName:'Question text and tags', renderCell: QuestionTextOverFlow},
    {field:'updated_at', headerName:'Last updated'},
    {field:'type', headerName:'Question Type'},
    {field:'number_of_tests', headerName:"# of tests"},
    {field:'edit', headerName:'', renderCell:(params)=>{return <ActionButton onClick={()=>editQuestion(params.row)}>Edit</ActionButton>}, disableClickEventBubbling:true},
    {field:'show', headerName:'', renderCell:(params)=>{return <ActionButton onClick={()=>showQuestion(params.row)}>Show</ActionButton>}, disableClickEventBubbling:true},
    {field:'is_active', headerName:'Is Active', type: 'boolean'},

]
const editQuestion = (row) =>{

}

const showQuestion = (row) =>{

}

export default ModifyQuestions;