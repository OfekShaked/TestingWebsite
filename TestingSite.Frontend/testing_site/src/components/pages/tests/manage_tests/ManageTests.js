import React,{useContext,useState,useEffect} from 'react';
import ActionButton from '../../../common/action_button/ActionButton';
import CommonTable from '../../../common/table/CommonTable';
import RedirectOnEmptyTopic from '../../../common/redirect_conditions/RedirectOnEmptyTopic';
import {Paper,Typography} from '@material-ui/core'
import Actions from './Actions';
import { TopicContext } from "../../../../contexts/TopicContext";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ManageTests = () =>{
    const topicContext = useContext(TopicContext);
    const navigate = useNavigate();
    const [tests,setTests] = useState([]);


    const copyLink = (id)=>{
        //copy link to the test
        navigator.clipboard.writeText(`${window.location.origin}/test/${id}`)
    }

    const loadTests = async()=>{
      const res = await axios.get("Tests");
      const rows = res.data.map(ques=>{return {
          ...ques,
          id:ques._id,
        }})
      setTests(rows);
    }

    const editTest = (testToEdit) =>{
      navigate(`/tests/modify/${testToEdit._id}`);
    }

    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { 
            field: "_id",
            headerName: "Link",
            renderCell: (params) => {
                return <ActionButton onClick={()=>copyLink(params.row._id)}>Copy Link</ActionButton>
            },
            disableClickEventBubbling: true,
            flex:1,
        },
        {
          field: "name", headerName: "Test Name", flex: 1 
        },
        {
          field: "questions",
          headerName: "# Of questions",
          renderCell: (params) => {return params.value.length},
          flex: 1,
        },
        { field: "updated_at", headerName: "Last updated", flex: 1 },
        {
          field: "edit",
          headerName: "",
          flex: 1,
          renderCell: (params) => {
            return (
              <ActionButton onClick={() => editTest(params.row)}>
                Edit
              </ActionButton>
            );
          },
          disableClickEventBubbling: true,
        },
        { field: "is_active", headerName: "Is Active", type: "boolean", flex: 1 },
      ];

      useEffect(() => {loadTests()},[])

    return(
        <>
        <RedirectOnEmptyTopic />
        <Paper className="main-container">
          <Typography>{topicContext.topic.name}</Typography>
          <CommonTable columns={columns} rows={tests}/>
          <Actions></Actions>
        </Paper>
      </>
    );
}

export default ManageTests;