import React from 'react';
import {Button} from '@mui/material'

const ActionButton = (props) =>{
    return(
        <Button variant="contained" color="primary" onClick={props.onClick}>
            {props.children}
        </Button>
    )
}
export default ActionButton;