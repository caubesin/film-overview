import React from 'react';
import img from '../img/err.gif';
import './css/error.css';

const Error = () => {
    return(
        <div className = 'error-img'>
                <img src={img} alt="Error img" />           
        </div>
    )
}

export default Error;