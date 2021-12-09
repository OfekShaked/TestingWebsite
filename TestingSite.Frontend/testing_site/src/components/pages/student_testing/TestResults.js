import React,{ useState,useEffect}  from 'react';
import {Card,CardContent,Typography,Stack} from '@mui/material'
import FormField from '../../common/form_field/FormField';
import './TestResults.css'

const TestResults = (props) =>{
    const {grade, numOfQuestions, passingGrade} = props;
    const [color,setColor] = useState("passing-text")
    const [correctQuestionsNum,setCorrectQuestionsNum] = useState(grade/100/numOfQuestions);

    useEffect(() => {
        if(grade>=passingGrade) setColor("passing-text");
        else setColor("failing_text")
    },[grade])

    useEffect(()=>{
        let amountPerQuestion = 100/numOfQuestions;
        setCorrectQuestionsNum(grade/amountPerQuestion);
    },[numOfQuestions])
    return(
        <Card variant="outlined">
            <CardContent>
                <Stack spacing={2}>
                    <FormField field={"Your Grade"}><Typography className={color}>{grade}</Typography></FormField>
                    <FormField field={"Status"}><Typography className={color}>{color==="passing-text"?"Passed":"Failed"}</Typography></FormField>
                    <FormField field={"Summary"}><Typography >You answered {correctQuestionsNum} correctly, out of {numOfQuestions} questions in total.</Typography></FormField>
                    <FormField field={"Passing Grade"}>The minimum grade to pass this test is {passingGrade}</FormField>
                </Stack>
            </CardContent>
        </Card>
    )
}
export default TestResults;