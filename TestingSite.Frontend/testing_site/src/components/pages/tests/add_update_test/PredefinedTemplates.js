import React from 'react';
import {Typography,Stack} from '@mui/material';

const PredefinedTemplates = () =>{
    const templates = ["@TestName@","@FirstName@","@LastName@","@Date@","@Grade@","@CertificateURL@"];
    const copyToClipboard = (text) =>{
        navigator.clipboard.writeText(text);
    }
    return(
        <Stack>
        <Typography variant="h5">Predefined Templates - click to copy to clipboard</Typography>
        <Typography variant="subtitle1">
            {templates.map((temp,index)=>{
                return <Typography key={index} component="span" onClick={()=>copyToClipboard(temp)}>{temp+" "}</Typography>
            })}
        </Typography>
        </Stack>
    )
}

export default PredefinedTemplates;