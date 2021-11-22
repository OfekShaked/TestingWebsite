import React from 'react';
import {Typography} from '@mui/material'

const QuestionField = (props) =>{

    return(<>
        <Typography inline>{props.field}: </Typography><Typography inline>{props.children}</Typography>
        </>
    );
}
export default QuestionField;