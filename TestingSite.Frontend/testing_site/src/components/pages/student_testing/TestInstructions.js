import React from 'react';
import {Card,CardContent,CardActions,Typography,Button} from '@mui/material'
import TextEditorToHtml from '../../common/texteditor_to_html/TextEditorToHtml';

const TestInstructions = (props) =>{
    const {name,instructions,startTest} = props;
    return(
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h2" component="div" gutterBottom>{name}</Typography>
                <TextEditorToHtml value={instructions}/>
                <CardActions>
                    <Button variant="contained" onClick={startTest}>Start Test</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default TestInstructions