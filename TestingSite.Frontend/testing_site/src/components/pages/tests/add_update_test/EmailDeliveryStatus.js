import React from 'react';
import {Stack,Typography} from '@mui/material'
import './EmailDeliveryStatus.css';

const EmailDelievryStatus = (props) =>{
    const {email} = props;

    const isEmailValid = () =>{
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    }

    return(
        <Stack>
            <Typography className={`email-status ${isEmailValid()?"on":"off"}`} variant="h6" gutterBottom>{isEmailValid()?"ON":"OFF"}</Typography>
            <Typography variant="subtitle2">Emails {isEmailValid()?"will":"won't"} be sent upon completion</Typography>
            {!isEmailValid()?<Typography variant="body2">To turn on email delivery, fill out the from field</Typography>:<></>}
        </Stack>
    )
}

export default EmailDelievryStatus