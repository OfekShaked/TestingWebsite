import React,{useState} from 'react';
import {Paper, MenuList, MenuItem,Select,FormControl, InputLabel,Divider,Typography} from '@mui/material'
import './MainPage.css'

const MainPage = () =>{
    const [topic,setTopic] = useState("")

    const handleChange = (event) =>{
        setTopic(event.target.value);
    }
    return (
        <Paper className="centerize">
            <FormControl fullWidth variant="filled">
            <InputLabel id="topic-select-label">Choose a field of study</InputLabel>
            <Select
                labelId="topic-select-label"
                id="topic-select"
                value={topic}
                inChange={handleChange}
            >
                <MenuItem value={10}><Typography className="center-typography">Ten</Typography></MenuItem>
                <MenuItem value={20}><Typography className="center-typography">Twenty</Typography></MenuItem>
                <MenuItem value={30}><Typography className="center-typography">Thirty</Typography></MenuItem>
            </Select>
            </FormControl>
            <Paper>
        <MenuList>
          <MenuItem><Typography className="center-typography">Manage questions {'>>'}</Typography></MenuItem>
          <Divider />
          <MenuItem><Typography className="center-typography">Manage tests {'>>'}</Typography></MenuItem>
          <Divider />
          <MenuItem><Typography className="center-typography">Reports {'>>'}</Typography></MenuItem>
        </MenuList>
      </Paper>
        </Paper>
    )
}
export default MainPage;