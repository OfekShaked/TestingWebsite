import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Stack,
  CardContent,
  Typography,
  Checkbox,
  TextField,
  CardActions,
  Button,
  Box,
  CardHeader,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import SelectChoices from "../../../common/select_choices/SelectChoices";
import FormField from "../../../common/form_field/FormField";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import useSelect from "../../../../hooks/useSelectValue/useSelect";
import axios from "axios";
import { TopicContext } from "../../../../contexts/TopicContext";

const TestReportSelection = (props) => {
  const { setIsTestReportStarted, setReport, backClick } = props;
  const [selectedTest, setSelectedTest] = useSelect(null);
  const [tests, setTests] = useState([]);
  const [dates, setDates] = useState([null, null]);
  const [isChecked, setIsChecked] = useState(false);
  const topicContext = useContext(TopicContext);

  const generateTestReport = async () => {
    if (selectedTest != null) {
      let res = null;
      if (isChecked === false && dates[1] != null && dates[2] != null) {
        res = await axios.get(
          `TestReport/${JSON.parse(selectedTest)._id}/${dates[0]}/${dates[1]}`
        );
      } else {
        res = await axios.get(`TestReport/${JSON.parse(selectedTest)._id}`);
      }
      if (res.status !== 200 || res.data == null) {
      } else {
        if (res.data.tests.length > 0) {
          res.data.tests = res.data.tests.map((test) => {
            return { ...test, id: test._id };
          });
          res.data.question_statistics = res.data.question_statistics.map(
            (ques) => {
              return { ...ques, id: ques.question._id };
            }
          );
        }
        setReport(res.data);
        setIsTestReportStarted(true);
      }
    }
  };

  const loadTests = async () => {
    const res = await axios.get(`Tests/names/${topicContext.topic._id}`);
    if (res.data.length > 0) {
      let test_choices = res.data.map((test) => {
        return { value: JSON.stringify(test), text: test.name };
      });
      setTests(test_choices);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  return (
    <>
      <Card variant="outlined">
          <CardHeader title="Report by Test"/>
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
                <FormGroup>
                <FormControlLabel control={<Checkbox checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)} />} label="Any date"/>
                </FormGroup>
              </LocalizationProvider>
            </Stack>
          </FormField>
          <CardActions>
            <Button variant="contained" onClick={backClick}>
              Back
            </Button>
            <Button variant="contained" onClick={generateTestReport}>
              Generate Report
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default TestReportSelection;
