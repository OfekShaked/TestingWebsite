import React from 'react';
import {Route,Routes } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';


const MainRouter = () =>{

    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
        </Routes>
    )
}

export default MainRouter;