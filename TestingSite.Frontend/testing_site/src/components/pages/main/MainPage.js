import React,{useState,useEffect,useContext} from 'react';
import {Paper, MenuList, MenuItem,Select,FormControl, InputLabel,Divider,Typography} from '@mui/material'
import './MainPage.css'
import useSelect from '../../../hooks/useSelectValue/useSelect';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {TopicContext} from '../../../contexts/TopicContext';

const MainPage = () =>{
    const [topic, setTopic] = useState("")
    const [topics,setTopics] = useState([]);
    const topicContext = useContext(TopicContext);

    const handleChange = (event) => {
        setTopic(event.target.value)
        topicContext.setTopic(topics.find(top=>top._id===event.target.value));
    }

    useEffect(()=>{
        const asyncHandler = async() =>{
            setTopics(await getTopics());
        }
        asyncHandler();
    },[])
    return (
        <Paper className="centerize">
            <FormControl fullWidth variant="filled">
            <InputLabel id="topic-select-label">Choose a field of study</InputLabel>
            <Select
                labelId="topic-select-label"
                id="topic-select"
                value={topic}
                onChange={handleChange}
            >
                {topics.map((topic)=>{
                    return <MenuItem key={topic._id} value={topic._id}><Typography className="center-typography">{topic.name}</Typography></MenuItem>
                })}
            </Select>
            </FormControl>
            <Paper>
        <MenuList>
          <MenuItem component={Link} to="/questions/manage"><Typography className="center-typography">Manage questions {'>>'}</Typography></MenuItem>
          <Divider />
          <MenuItem component={Link} to="/tests/manage"><Typography className="center-typography">Manage tests {'>>'}</Typography></MenuItem>
          <Divider />
          <MenuItem  component={Link} to="/report"><Typography className="center-typography">Reports {'>>'}</Typography></MenuItem>
        </MenuList>
      </Paper>
        </Paper>
    )
}

const getTopics = async () =>{
    /**
     * get topics from the servers
     * Returns array of topics
     */
    const res = await axios.get("Topics");
    return res.data;
}
export default MainPage;