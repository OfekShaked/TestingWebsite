import React from "react";
import {FormControl,FormLabel,RadioGroup,Radio,FormControlLabel} from '@mui/material'

const AnswerAlignment = (props) =>{

    return(
        <FormControl component="fieldset">
            <FormLabel component="legend">Answer Alignmenet</FormLabel>
            <RadioGroup row aria-label="orientation" name="row-radio-buttons-group" value={props.value} onChange={(e)=>{props.changeOrientation(e.target.value)}}>
                <FormControlLabel value="Horizontal" control={<Radio/>} label="Horizontal"/>
                <FormControlLabel value="Vertical" control={<Radio/>} label="Vertical"/>
            </RadioGroup>
        </FormControl>
    )
}

export default AnswerAlignment;