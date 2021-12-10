import React from 'react';
import { Snackbar} from '@mui/material';
import {Alert,AlertTitle} from '@mui/material'

const ErrorNotification = (props) =>{
    const {open,setOpen,message} = props;
    const handleClose = () =>{
        setOpen(false);
    }
    return(
        <Snackbar
            anchorOrigin={{vertical:'top',horizontal:'center'}}
            open={open}
            onClose={handleClose}
            key={'top-center'}
            autoHideDuration={6000}
        >
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
                {message}
                </Alert>
        </Snackbar>
    )
}
export default ErrorNotification;