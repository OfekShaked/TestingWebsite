import React from 'react';


const DateProvider = (props) =>{
    const {date} = props;
    return(
        <>
        {new Date(date).toLocaleString()}
        </>
    )
}

export default DateProvider;