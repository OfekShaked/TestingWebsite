import React from 'react';
import {Typography,Stack} from '@mui/material'
import './FormField.css'

const FormField = (props) =>{
    
    return(
        <Stack direction="row">
        <Typography inline>{props.field}: </Typography>
        <Typography inline>{props.children}</Typography>
        </Stack>
    );
}
export default FormField;