import React from 'react';
import {FormControl,Select,MenuItem} from '@mui/material';

const SelectChoices = (props) =>{
    const {value,onValueChange,choices,header} = props;
    return(
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Select
                labelId="question-type-select-label"
                value={value}
                onChange={onValueChange}
                autoWidth
                label={header}
              >
                  {choices.map((choice,index)=>{
                      return(
                          <MenuItem key={index} value={choice.value}>
                          {choice.text}
                          </MenuItem>
                      )
                  })}
              </Select>
            </FormControl>
    );
}
export default SelectChoices;