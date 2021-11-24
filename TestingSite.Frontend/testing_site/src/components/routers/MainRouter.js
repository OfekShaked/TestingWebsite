import React from 'react';
import {Route,Routes } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import ModifyQuestion from '../pages/questions/add_update_question/ModifyQuestion';
import ManageQuestions from '../pages/questions/manage_questions/ManageQuestions';


const MainRouter = () =>{

    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/questions/modify" element = {<ModifyQuestion/>}/>
            <Route path="/questions/manage" element= {<ManageQuestions/>}/>
        </Routes>
    )
}

export default MainRouter;