import React from 'react';
import {Button,Stack} from '@mui/material';
import {Link} from 'react-router-dom';

const Actions = (props) =>{

    return(
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
            <Button component={Link} to="/" variant="contained">{'<<'} Back</Button>
            <Button variant="contained" component={Link} to={{pathname:`/tests/modify/add`}} state={{topic:props.topic}}>Add New Test {'>>'}</Button>
        </Stack>
    )
}

export default Actions;