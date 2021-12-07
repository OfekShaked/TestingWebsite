import React from 'react';
import {Button,Stack} from '@mui/material';
import {Link} from 'react-router-dom';

const Actions = (props) =>{

    return(
        <Stack direction="row" spacing={2}>
        <Button variant="contained" component={Link} to="/tests/manage">{'<<'} Back</Button>
        <Button variant="contained" onClick={props.save}>Save {'>>'}</Button>
    </Stack>
    )
}

export default Actions;