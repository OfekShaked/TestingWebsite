import React, { useState, useEffect, useContext } from "react";
import { TopicContext } from "../../../../contexts/TopicContext";
import RedirectOnEmptyTopic from "../../../common/redirect_conditions/RedirectOnEmptyTopic";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  Checkbox,
  Stack
} from "@mui/material";
import FormField from "../../../common/form_field/FormField";
import SelectChoices from "../../../common/select_choices/SelectChoices";
import useSelect from "../../../../hooks/useSelectValue/useSelect";
import {
  DateRangePicker,
  LocalizationProvider,
} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


const ReportSelection = (props) => {
    const topicContext = useContext(TopicContext);
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useSelect(null);
  const [tests, setTests] = useState([]);
  const [dates, setDates] = useState([null, null]);
  const [isChecked,setIsChecked] = useState(false);
  const backClick = () => {navigate("/")};

  const generateReport = async() => {
    const res = await axios.get(`TestReport/${JSON.parse(selectedTest)._id}`)
    console.log(res.data);
  };

  const loadTests = async()=>{
    const res = await axios.get(`Tests/names/${topicContext.topic._id}`)
    if(res.data.length>0){
    let test_choices= res.data.map((test)=>{return {value:JSON.stringify(test),text:test.name}});
    console.log(test_choices);
    setTests(test_choices);
    }
  }

  useEffect(() => {
    loadTests();
  },[])

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <FormField field={"Select Test"}>
            <SelectChoices
              value={selectedTest}
              onValueChange={setSelectedTest}
              choices={tests}
              header="Select Test"
            />
          </FormField>
          <FormField field={"Date Range"}>
              <Stack>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="From"
                endText="To"
                value={dates}
                onChange={(newValue) => {
                  setDates(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
              <Typography>Or</Typography>
              <Checkbox checked={isChecked} onChange={setIsChecked}/>
            </LocalizationProvider>
            </Stack>
          </FormField>
          <CardActions>
            <Button variant="contained" onClick={backClick}>
              Back
            </Button>
            <Button variant="contained" onClick={generateReport}>
              Generate Report
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <RedirectOnEmptyTopic />
    </>
  );
};

export default ReportSelection;
