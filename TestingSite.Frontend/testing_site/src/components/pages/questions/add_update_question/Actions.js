import React from 'react';
import {Button,Stack} from '@mui/material';

const Actions = (props) =>{

    return(
        <Stack direction="row">
            <Button variant="containted" onClick={props.back}>{'<<'} Back</Button>
            <Button variant="containted" color="success" onClick={props.show}>Show</Button>
            <Button variant="containted" onClick={props.save}>Save {'>>'}</Button>
        </Stack>
    )
}

export default Actions;