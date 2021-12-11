import React from 'react';
import {Route,Routes } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import ModifyQuestion from '../pages/questions/add_update_question/ModifyQuestion';
import ManageQuestions from '../pages/questions/manage_questions/ManageQuestions';
import ManageTests from '../pages/tests/manage_tests/ManageTests';
import ModifyTest from '../pages/tests/add_update_test/ModifyTest';
import TestToTake from '../pages/student_testing/TestToTake';
import ReportSelection from '../pages/reports/report_selection/ReportSelection';
import TestReport from '../pages/reports/report_selection/test_report/TestReport';


const MainRouter = () =>{

    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/questions/modify/:id" element = {<ModifyQuestion/>}/>
            <Route path="/questions/manage" element= {<ManageQuestions/>}/>
            <Route path="/tests/modify/:id" element = {<ModifyTest/>}/>
            <Route path="/tests/manage" element= {<ManageTests/>}/>
            <Route path="/test/:id" element= {<TestToTake/>}/>
            <Route path="/report" element= {<ReportSelection/>}/>
            <Route path="/TestReport/:id" element={<TestReport/>}/>
            </Routes>
    )
}

export default MainRouter;