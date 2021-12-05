import React from 'react';
import {Button,Stack} from '@mui/material';
import {Link} from 'react-router-dom';

const Actions = (props) =>{

    return(
        <Stack direction="row" spacing={2}>
            <Button variant="contained" component={Link} to="/questions/manage">{'<<'} Back</Button>
            <Button variant="contained" color="success" onClick={props.show}>Show</Button>
            <Button variant="contained" onClick={props.save}>Save {'>>'}</Button>
        </Stack>
    )
}

export default Actions;