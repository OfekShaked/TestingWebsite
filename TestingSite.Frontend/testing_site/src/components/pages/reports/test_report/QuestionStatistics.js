import React from 'react';
import StatisticsTable from './statistics_table/StatisticsTable';

const QuestionStatistics = (props) =>{
    const {questions} = props;

    return(<>
        <StatisticsTable rows={questions}/>
    </>)
}
export default QuestionStatistics;