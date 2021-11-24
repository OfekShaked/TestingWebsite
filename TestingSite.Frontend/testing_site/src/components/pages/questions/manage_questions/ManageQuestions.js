import React,{useContext} from 'react';
import {Paper,Typography} from '@mui/material';
import CommonTable from '../../../common/table/CommonTable'
import QuestionTextOverFlow from "./column_renders/question_text_and_tag/QuestionTextOverFlow";
import ActionButton from './column_renders/action_button/ActionButton';
import './ManageQuestions.css';
import Actions from './Actions';
import {TopicContext} from '../../../../contexts/TopicContext';

const ManageQuestions =  () =>{
    const topicContext = useContext(TopicContext);
    return (
        <Paper className="main-container">
            <Typography>{topicContext.topic.name}</Typography>
            <CommonTable columns={columns}/>
            <Actions></Actions>
        </Paper>
    );
}

const columns = [
    {field: '_id', headerName:'ID',flex:1},
    {field: 'text', headerName:'Question text and tags', renderCell: QuestionTextOverFlow,flex:1},
    {field:'updated_at', headerName:'Last updated',flex:1},
    {field:'type', headerName:'Question Type',flex:1},
    {field:'number_of_tests', headerName:"# of tests",flex:1},
    {field:'edit', headerName:'',flex:1, renderCell:(params)=>{return <ActionButton onClick={()=>editQuestion(params.row)}>Edit</ActionButton>}, disableClickEventBubbling:true},
    {field:'show', headerName:'',flex:1, renderCell:(params)=>{return <ActionButton onClick={()=>showQuestion(params.row)}>Show</ActionButton>}, disableClickEventBubbling:true},
    {field:'is_active', headerName:'Is Active', type: 'boolean',flex:1},

]
const editQuestion = (row) =>{

}

const showQuestion = (row) =>{

}

export default ManageQuestions;