import React,{useEffect,useContext} from 'react';
import {useNavigate } from 'react-router-dom';
import {TopicContext} from '../../../contexts/TopicContext';

const RedirectOnEmptyTopic = () =>{
    //redirect to main page when topic context is empty
    const topicContext = useContext(TopicContext);
    const navigate = useNavigate ();
    useEffect(()=>{
        if(topicContext.topic==null||topicContext.topic._id==null){
            navigate("/")
        }
    },[])

    return (<></>);
}
export default RedirectOnEmptyTopic;