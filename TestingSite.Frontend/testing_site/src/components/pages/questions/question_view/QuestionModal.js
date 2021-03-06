import React from 'react';
import Question from './Question';
import {Modal} from '@mui/material'
import './QuestionModal.css';

const QuestionModal = (props) =>{
    const {open,handleClose,question} = props;

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Question question={question} className={'modal-center'}/>
        </Modal>
    );
}
export default QuestionModal;