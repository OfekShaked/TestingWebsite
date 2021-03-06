import React,{ useEffect, useState}from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import TextEditorToHtml from "../../../common/texteditor_to_html/TextEditorToHtml";

const Answer = (props) => {
    const {testTakenQuestion,name,answer} = props;
    const [isChecked,setIsChecked] = useState(false);

    const handleChange = (event) => {
        //handles what happens when checkbox is clicked
        props.handleChangeAnswer(answer._id,event.target.checked)
    }

    useEffect(()=>{
        //update checked state based on chosen answers array
        if(testTakenQuestion?.answers_chosen?.includes(answer._id)){
            setIsChecked(true);
        }
        else{
            setIsChecked(false);
        }
    },[testTakenQuestion])
    
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          name={name}
        />
      }
      label={<TextEditorToHtml value={answer.text}></TextEditorToHtml>}
    />
  );
};
export default Answer;
